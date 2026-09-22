import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { destroySession, getSession } from "@/lib/session";
import User from "@/models/User";

export async function PUT(req: Request) {
  const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

            const body = await req.json().catch(() => null);
              const currentPassword = String(body?.currentPassword ?? "");
                const newPassword = String(body?.newPassword ?? "");

                  if (newPassword.length < 8) {
                      return NextResponse.json(
                            { error: "Use at least 8 characters for your new password." },
                                  { status: 400 }
                                      );
                                        }

                                          await connectDB();
                                            const user = await User.findById(session.userId);
                                              const valid =
                                                  user && (await bcrypt.compare(currentPassword, user.passwordHash));
                                                    if (!user || !valid) {
                                                        return NextResponse.json(
                                                              { error: "Your current password is incorrect." },
                                                                    { status: 400 }
                                                                        );
                                                                          }

                                                                            user.passwordHash = await bcrypt.hash(newPassword, 12);
                                                                              // Invalidates every session issued before this moment, on all devices
                                                                                user.tokenVersion = (user.tokenVersion ?? 0) + 1;
                                                                                  await user.save();

                                                                                // Sign the user out so they log in again with the new password
                                                                                  await destroySession();

                                                                                    return NextResponse.json({ ok: true });
                                                                                    }