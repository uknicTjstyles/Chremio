export type Tx = {
      id: string;
        type: "income" | "expense";
          amount: number;
            category: string;
              description: string;
                date: string; // ISO string
                };
}