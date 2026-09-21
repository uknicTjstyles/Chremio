import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import {
  parseTransaction,
    serializeTransaction,
      type TxDoc,
      } from "@/lib/transactions";
      import Transaction from "@/models/Transaction";

      function escapeRegex(s: string) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        export async function GET(req: Request) {
          const session = await getSession();
            if (!session) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
                  }

                    const { searchParams } = new URL(req.url);
                      const type = searchParams.get("type");
                        const category = searchParams.get("category");
                          const q = searchParams.get("q")?.trim();

                            const filter: Record<string, unknown> = { userId: session.userId };
                              if (type === "income" || type === "expense") filter.type = type;
                                if (category) filter.category = category;
                                  if (q) {
                                      const rx = { $regex: escapeRegex(q), $options: "i" };
                                          filter.$or = [{ description: rx }, { category: rx }];
                                            }

                                              await connectDB();
                                                const items = (await Transaction.find(filter)
                                                    .sort({ date: -1, createdAt: -1 })
                                                        .limit(500)
                                                            .lean()) as TxDoc[];

                                                              return NextResponse.json({ transactions: items.map(serializeTransaction) });
                                                              }

                                                              export async function POST(req: Request) {
                                                                const session = await getSession();
                                                                  if (!session) {
                                                                      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
                                                                        }

                                                                          const body = await req.json().catch(() => null);
                                                                            const { data, error } = parseTransaction(body);
                                                                              if (!data) {
                                                                                  return NextResponse.json({ error }, { status: 400 });
                                                                                    }

                                                                                      await connectDB();
                                                                                        const created = await Transaction.create({
                                                                                            ...data,
                                                                                                userId: session.userId,
                                                                                                  });

                                                                                                    return NextResponse.json(
                                                                                                        { transaction: serializeTransaction(created.toObject()) },
                                                                                                            { status: 201 }
                                                                                                              );
                                                                                                              }