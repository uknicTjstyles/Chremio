import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "./categories";

export type TxInput = {
  type: "income" | "expense";
    amount: number;
      category: string;
        description: string;
          date: Date;
          };

          export function parseTransaction(body: unknown): {
            data: TxInput | null;
              error: string | null;
              } {
                const b = (body ?? {}) as Record<string, unknown>;
                  const type = b.type;
                    const amount = Number(b.amount);
                      const category = String(b.category ?? "").trim();
                        const description = String(b.description ?? "").trim().slice(0, 200);
                          const date = new Date(String(b.date ?? ""));

                            if (type !== "income" && type !== "expense") {
                                return { data: null, error: "Choose income or expense." };
                                  }
                                    if (!Number.isFinite(amount) || amount <= 0) {
                                        return { data: null, error: "Enter an amount greater than zero." };
                                          }
                                            const allowed = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
                                              if (!allowed.includes(category)) {
                                                  return { data: null, error: "Choose a valid category." };
                                                    }
                                                      if (Number.isNaN(date.getTime())) {
                                                          return { data: null, error: "Enter a valid date." };
                                                            }

                                                              return {
                                                                  data: {
                                                                        type,
                                                                              amount: Math.round(amount * 100) / 100,
                                                                                    category,
                                                                                          description,
                                                                                                date,
                                                                                                    },
                                                                                                        error: null,
                                                                                                          };
                                                                                                          }

                                                                                                          type TxDoc = {
                                                                                                            _id: unknown;
                                                                                                              type: string;
                                                                                                                amount: number;
                                                                                                                  category: string;
                                                                                                                    description?: string;
                                                                                                                      date: Date | string;
                                                                                                                      };

                                                                                                                      export function serializeTransaction(t: TxDoc) {
                                                                                                                        return {
                                                                                                                            id: String(t._id),
                                                                                                                                type: t.type,
                                                                                                                                    amount: t.amount,
                                                                                                                                        category: t.category,
                                                                                                                                            description: t.description ?? "",
                                                                                                                                                date: new Date(t.date).toISOString(),
                                                                                                                                                  };
                                                                                                                                                  }

                                                                                                                                                  export type { TxDoc };