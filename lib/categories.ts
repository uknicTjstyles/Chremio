export const EXPENSE_CATEGORIES = [
      "Food & Drinks",
        "Transport",
          "Bills",
            "Entertainment",
              "Shopping",
                "Health",
                  "Education",
                    "Others",
                    ];

                    export const INCOME_CATEGORIES = [
                      "Salary",
                        "Freelance",
                          "Business",
                            "Gift",
                              "Others",
                              ];

                              export const ALL_CATEGORIES = Array.from(
                                new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])
                                );
]