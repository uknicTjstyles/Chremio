import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { serializeTransaction, type TxDoc } from "@/lib/transactions";
import Transaction from "@/models/Transaction";

type TypeRow = { _id: string; total: number };
type MonthRow = {
  _id: { month: string; type: "income" | "expense" };
    total: number;
    };

    const round = (n: number) => Math.round(n * 100) / 100;
    const sumOf = (rows: TypeRow[], type: string) =>
      rows.find((r) => r._id === type)?.total ?? 0;

      export async function getSummary(userId: string) {
        await connectDB();
          const uid = new mongoose.Types.ObjectId(userId);

            const now = new Date();
              const y = now.getUTCFullYear();
                const m = now.getUTCMonth();
                  const monthStart = new Date(Date.UTC(y, m, 1));
                    const nextMonthStart = new Date(Date.UTC(y, m + 1, 1));
                      const sixMonthsAgo = new Date(Date.UTC(y, m - 5, 1));

                        const thisMonth = { $gte: monthStart, $lt: nextMonthStart };

                          const [allTime, monthTotals, byCategory, monthlyRows, recent] =
                              await Promise.all([
                                    Transaction.aggregate([
                                            { $match: { userId: uid } },
                                                    { $group: { _id: "$type", total: { $sum: "$amount" } } },
                                                          ]),
                                                                Transaction.aggregate([
                                                                        { $match: { userId: uid, date: thisMonth } },
                                                                                { $group: { _id: "$type", total: { $sum: "$amount" } } },
                                                                                      ]),
                                                                                            Transaction.aggregate([
                                                                                                    { $match: { userId: uid, type: "expense", date: thisMonth } },
                                                                                                            { $group: { _id: "$category", total: { $sum: "$amount" } } },
                                                                                                                    { $sort: { total: -1 } },
                                                                                                                          ]),
                                                                                                                                Transaction.aggregate([
                                                                                                                                        {
                                                                                                                                                  $match: { userId: uid, date: { $gte: sixMonthsAgo, $lt: nextMonthStart } },
                                                                                                                                                          },
                                                                                                                                                                  {
                                                                                                                                                                            $group: {
                                                                                                                                                                                        _id: {
                                                                                                                                                                                                      month: { $dateToString: { format: "%Y-%m", date: "$date" } },
                                                                                                                                                                                                                    type: "$type",
                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            total: { $sum: "$amount" },
                                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                    ]),
                                                                                                                                                                                                                                                                          Transaction.find({ userId: uid })
                                                                                                                                                                                                                                                                                  .sort({ date: -1, createdAt: -1 })
                                                                                                                                                                                                                                                                                          .limit(5)
                                                                                                                                                                                                                                                                                                  .lean(),
                                                                                                                                                                                                                                                                                                      ]);

                                                                                                                                                                                                                                                                                                        // Last 6 months, oldest first, filled with zeros where there is no data
                                                                                                                                                                                                                                                                                                          const monthly: { month: string; income: number; expense: number }[] = [];
                                                                                                                                                                                                                                                                                                            for (let i = 5; i >= 0; i--) {
                                                                                                                                                                                                                                                                                                                const d = new Date(Date.UTC(y, m - i, 1));
                                                                                                                                                                                                                                                                                                                    monthly.push({ month: d.toISOString().slice(0, 7), income: 0, expense: 0 });
                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                        for (const r of monthlyRows as MonthRow[]) {
                                                                                                                                                                                                                                                                                                                            const slot = monthly.find((x) => x.month === r._id.month);
                                                                                                                                                                                                                                                                                                                                if (slot) slot[r._id.type] = round(r.total);
                                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                                    return {
                                                                                                                                                                                                                                                                                                                                        balance: round(
                                                                                                                                                                                                                                                                                                                                              sumOf(allTime as TypeRow[], "income") -
                                                                                                                                                                                                                                                                                                                                                      sumOf(allTime as TypeRow[], "expense")
                                                                                                                                                                                                                                                                                                                                                          ),
                                                                                                                                                                                                                                                                                                                                                              monthIncome: round(sumOf(monthTotals as TypeRow[], "income")),
                                                                                                                                                                                                                                                                                                                                                                  monthExpense: round(sumOf(monthTotals as TypeRow[], "expense")),
                                                                                                                                                                                                                                                                                                                                                                      byCategory: (byCategory as TypeRow[]).map((r) => ({
                                                                                                                                                                                                                                                                                                                                                                            category: r._id,
                                                                                                                                                                                                                                                                                                                                                                                  total: round(r.total),
                                                                                                                                                                                                                                                                                                                                                                                      })),
                                                                                                                                                                                                                                                                                                                                                                                          monthly,
                                                                                                                                                                                                                                                                                                                                                                                              recent: (recent as TxDoc[]).map(serializeTransaction),
                                                                                                                                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                                                                                                                                }