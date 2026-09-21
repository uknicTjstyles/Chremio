import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
      userId: {
            type: Schema.Types.ObjectId,
                  ref: "User",
                        required: true,
                              index: true,
                                  },
                                      type: { type: String, enum: ["income", "expense"], required: true },
                                          amount: { type: Number, required: true, min: 0.01 },
                                              category: { type: String, required: true, trim: true },
                                                  description: { type: String, trim: true, default: "" },
                                                      date: { type: Date, required: true, default: Date.now },
                                                        },
                                                          { timestamps: true }
                                                          );

                                                          TransactionSchema.index({ userId: 1, date: -1 });

                                                          const Transaction =
                                                            mongoose.models.Transaction ||
                                                              mongoose.model("Transaction", TransactionSchema);
                                                              export default Transaction;