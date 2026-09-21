"use client";

import {
  Bar,
    BarChart,
      CartesianGrid,
        Legend,
          ResponsiveContainer,
            Tooltip,
              XAxis,
                YAxis,
                } from "recharts";
                import { money } from "@/lib/format";

                const monthLabel = (ym: string) => {
                  const [y, m] = ym.split("-").map(Number);
                    return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
                        month: "short",
                            timeZone: "UTC",
                              });
                              };

                              export default function MonthlyChart({
                                data,
                                }: {
                                  data: { month: string; income: number; expense: number }[];
                                  }) {
                                    const rows = data.map((d) => ({ ...d, name: monthLabel(d.month) }));

                                      return (
                                          <div className="h-72 w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                                            <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                                                                      <YAxis
                                                                                                  tickLine={false}
                                                                                                              axisLine={false}
                                                                                                                          width={48}
                                                                                                                                      tickFormatter={(v: number) =>
                                                                                                                                                    v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
                                                                                                                                                                }
                                                                                                                                                                          />
                                                                                                                                                                                    <Tooltip
                                                                                                                                                                                                formatter={(value) => money.format(Number(value))}
                                                                                                                                                                                                            cursor={{ fill: "#F1F5F9" }}
                                                                                                                                                                                                                      />
                                                                                                                                                                                                                                <Legend />
                                                                                                                                                                                                                                          <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                                                                                                                                                                                                                                                    <Bar dataKey="expense" name="Spending" fill="#0B1220" radius={[4, 4, 0, 0]} />
                                                                                                                                                                                                                                                            </BarChart>
                                                                                                                                                                                                                                                                  </ResponsiveContainer>
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                        }