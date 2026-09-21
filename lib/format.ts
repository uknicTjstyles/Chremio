const whole = new Intl.NumberFormat("en-NG", {
    style: "currency",
      currency: "NGN",
        maximumFractionDigits: 0,
        });

        const decimal = new Intl.NumberFormat("en-NG", {
          style: "currency",
            currency: "NGN",
            });

            // Shows ₦200,000 for whole amounts and ₦1,234.50 when there are kobo
            export const money = {
              format: (n: number) =>
                  Number.isInteger(n) ? whole.format(n) : decimal.format(n),
                  };

                  export const formatDate = (iso: string) =>
                    new Date(iso).toLocaleDateString("en-GB", {
                        day: "numeric",
                            month: "short",
                                year: "numeric",
                                    timeZone: "UTC",
                                      });
