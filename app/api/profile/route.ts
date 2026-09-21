import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { createSession, getSession } from "@/lib/session";
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