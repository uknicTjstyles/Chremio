import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const COOKIE_NAME = "chremio_session";
const MAX_AGE = 60 * 60 * 24 * 1; // 1 day

export type Session = { userId: string; name: string; email: string };

function getSecret() {
  const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET is missing. Add it to .env.local");
      return new TextEncoder().encode(secret);
      }

      // tokenVersion ties the cookie to the user's current password version
      export async function createSession(session: Session, tokenVersion: number) {
        const token = await new SignJWT({ ...session, v: tokenVersion })
            .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                    .setExpirationTime("1d")
                        .sign(getSecret());

                          const jar = await cookies();
                            jar.set(COOKIE_NAME, token, {
                                httpOnly: true,
                                    secure: process.env.NODE_ENV === "production",
                                        sameSite: "lax",
                                            path: "/",
                                                maxAge: MAX_AGE,
                                                  });
                                                  }

                                                  // cache() means the database check runs once per request, even if the
                                                  // layout and the page both call getSession()
                                                  export const getSession = cache(async (): Promise<Session | null> => {
                                                    const jar = await cookies();
                                                      const token = jar.get(COOKIE_NAME)?.value;
                                                        if (!token) return null;

                                                          try {
                                                              const { payload } = await jwtVerify(token, getSecret());

                                                                  await connectDB();
                                                                      const user = (await User.findById(payload.userId)
                                                                            .select("name email tokenVersion")
                                                                                  .lean()) as {
                                                                                        _id: unknown;
                                                                                              name: string;
                                                                                                    email: string;
                                                                                                          tokenVersion?: number;
                                                                                                              } | null;

                                                                                                                  // Account was deleted
                                                                                                                      if (!user) return null;
                                                                                                                          // Password was changed after this cookie was issued
                                                                                                                              if ((user.tokenVersion ?? 0) !== Number(payload.v ?? 0)) return null;

                                                                                                                                  return { userId: String(user._id), name: user.name, email: user.email };
                                                                                                                                    } catch {
                                                                                                                                        return null;
                                                                                                                                          }
                                                                                                                                          });

                                                                                                                                          export async function destroySession() {
                                                                                                                                            const jar = await cookies();
                                                                                                                                              jar.delete(COOKIE_NAME);
                                                                                                                                              }