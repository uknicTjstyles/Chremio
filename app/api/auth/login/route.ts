import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/User";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
    const email = String(body?.email ?? "").trim().toLowerCase();
      const password = String(body?.password ?? "");

        if (!email || !password) {
            return NextResponse.json(
                  { error: "Enter your email and password." },
                        { status: 400 }
                            );
                              }

                                await connectDB();

                                  const user = await User.findOne({ email });
                                    const valid = user && (await bcrypt.compare(password, user.passwordHash));
                                      if (!user || !valid) {
                                          return NextResponse.json(
                                                { error: "Email or password is incorrect." },
                                                      { status: 401 }
                                                          );
                                                            }

                                                              await createSession(
                                                                    { userId: user._id.toString(), name: user.name, email: user.email },
                                                                        user.tokenVersion ?? 0
                                                                          );
                                                              

                                                                              return NextResponse.json({ ok: true });
                                                                              } 