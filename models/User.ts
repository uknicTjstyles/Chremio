import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
      name: { type: String, required: true, trim: true },
          email: {
                type: String,
                      required: true,
                            unique: true,
                                  lowercase: true,
                                        trim: true,
                                            },
                                                passwordHash: { type: String, required: true },
                                                    // Bumped on every password change to invalidate old sessions
                                                        tokenVersion: { type: Number, default: 0 },
                                                          },
                                                            { timestamps: true }
                                                            );

                                                            const User = mongoose.models.User || mongoose.model("User", UserSchema);
                                                            export default User;