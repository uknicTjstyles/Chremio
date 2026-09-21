import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { createSession, destroySession, getSession } from "@/lib/session";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export async function PATCH(req: Request) {
  const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

            const body = await req.json().catch(() => null);
              const name = String(body?.name ?? "").trim();
                if (name.length < 2 || name.length > 60) {
                    return NextResponse.json(
                          { error: "Enter a name between 2 and 60 characters." },
                                { status: 400 }
                                    );
                                      }

                                        await connectDB();
                                          const user = await User.findByIdAndUpdate(
                                              session.userId,
                                                  { name },
                                                      { new: true }
                                                        );
                                                          if (!user) {
                                                              return NextResponse.json({ error: "Account not found." }, { status: 404 });
                                                                }

                                                                  // Refresh the session cookie so the new name shows everywhere
                                                                    await createSession({
                                                                        userId: session.userId,
                                                                            name: user.name,
                                                                                email: user.email,
                                                                                  });

                                                                                    return NextResponse.json({ ok: true, name: user.name });
                                                                                    }

                                                                                    export async function DELETE(req: Request) {
                                                                                      const session = await getSession();
                                                                                        if (!session) {
                                                                                            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
                                                                                              }

                                                                                                const body = await req.json().catch(() => null);
                                                                                                  const password = String(body?.password ?? "");
                                                                                                    if (!password) {
                                                                                                        return NextResponse.json(
                                                                                                              { error: "Enter your password to confirm." },
                                                                                                                    { status: 400 }
                                                                                                                        );
                                                                                                                          }

                                                                                                                            await connectDB();
                                                                                                                              const user = await User.findById(session.userId);
                                                                                                                                const valid = user && (await bcrypt.compare(password, user.passwordHash));
                                                                                                                                  if (!user || !valid) {
                                                                                                                                      return NextResponse.json(
                                                                                                                                            { error: "Your password is incorrect." },
                                                                                                                                                  { status: 400 }
                                                                                                                                                      );
                                                                                                                                                        }

                                                                                                                                                          await Transaction.deleteMany({ userId: session.userId });
                                                                                                                                                            await User.findByIdAndDelete(session.userId);
                                                                                                                                                              await destroySession();

                                                                                                                                                                return NextResponse.json({ ok: true });
                                                                                                                                                                }