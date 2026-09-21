import Link from "next/link";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-midnight p-6 text-white">
            <h1 className="font-heading text-4xl">Chremio</h1>
                  <p className="text-white/70">Manage your money. Build your future.</p>
                        <div className="flex gap-3">
                                <Link
                                          href="/sign-up"
                                                    className="rounded-lg bg-evergreen px-5 py-2.5 font-medium text-midnight"
                                                            >
                                                                      Create account
                                                                              </Link>
                                                                                      <Link
                                                                                                href="/sign-in"
                                                                                                          className="rounded-lg border border-white/30 px-5 py-2.5 font-medium"
                                                                                                                  >
                                                                                                                            Sign in
                                                                                                                                    </Link>
                                                                                                                                          </div>
                                                                                                                                              </main>
                                                                                                                                                );
                                                                                                                                                }