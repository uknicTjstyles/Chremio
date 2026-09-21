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

                              const tick = { fill: "#94A3B8", fontSize: 12 };

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
                                                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#243247" />
                                                                            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={tick} />
                                                                                      <YAxis
                                                                                                  tickLine={false}
                                                                                                              axisLine={false}
                                                                                                                          width={48}
                                                                                                                                      tick={tick}
                                                                                                                                                  tickFormatter={(v: number) =>
                                                                                                                                                                v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
                                                                                                                                                                            }
                                                                                                                                                                                      />
                                                                                                                                                                                                <Tooltip
                                                                                                                                                                                                            formatter={(value) => money.format(Number(value))}
                                                                                                                                                                                                                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                                                                                                                                                                                                                    contentStyle={{
                                                                                                                                                                                                                                                  background: "#182339",
                                                                                                                                                                                                                                                                border: "1px solid #243247",
                                                                                                                                                                                                                                                                              borderRadius: 8,
                                                                                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                                                                                                      itemStyle={{ color: "#F1F5F9" }}
                                                                                                                                                                                                                                                                                                                  labelStyle={{ color: "#F1F5F9" }}
                                                                                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                                                                                                      <Legend
                                                                                                                                                                                                                                                                                                                                                  formatter={(value) => (
                                                                                                                                                                                                                                                                                                                                                                <span style={{ color: "#CBD5E1" }}>{value}</span>
                                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                                      />
                                                                                                                                                                                                                                                                                                                                                                                                <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                                                                                                                                                                                                                                                                                                                                                                                                          <Bar dataKey="expense" name="Spending" fill="#F87171" radius={[4, 4, 0, 0]} />
                                                                                                                                                                                                                                                                                                                                                                                                                  </BarChart>
                                                                                                                                                                                                                                                                                                                                                                                                                        </ResponsiveContainer>
                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                                                                                              }