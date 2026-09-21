import Image from "next/image";
import Link from "next/link";

function Brand({ light = false }: { light?: boolean }) {
  return (
      <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/brand/app-icon.png" alt="" width={40} height={40} />
                  <span
                          className={`font-heading text-2xl font-semibold ${
                                    light ? "text-white" : "text-midnight"
                                            }`}
                                                  >
                                                          Chremio
                                                                </span>
                                                                    </Link>
                                                                      );
                                                                      }

                                                                      export default function AuthShell({
                                                                        title,
                                                                          subtitle,
                                                                            footer,
                                                                              children,
                                                                              }: {
                                                                                title: string;
                                                                                  subtitle: string;
                                                                                    footer: React.ReactNode;
                                                                                      children: React.ReactNode;
                                                                                      }) {
                                                                                        return (
                                                                                            <main className="grid min-h-screen md:grid-cols-2">
                                                                                                  <aside className="hidden flex-col justify-between bg-midnight p-12 text-white md:flex">
                                                                                                          <Brand light />
                                                                                                                  <div>
                                                                                                                            <p className="font-heading text-4xl leading-tight">
                                                                                                                                        Manage your money.
                                                                                                                                                    <br />
                                                                                                                                                                Build your future.
                                                                                                                                                                          </p>
                                                                                                                                                                                    <p className="mt-4 max-w-sm text-white/70">
                                                                                                                                                                                                Record what comes in and what goes out, then see where your money
                                                                                                                                                                                                            goes each month.
                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                      <p className="text-sm text-white/50">
                                                                                                                                                                                                                                                More than tracking. It&apos;s financial freedom.
                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                              </aside>

                                                                                                                                                                                                                                                                    <section className="flex items-center justify-center p-6">
                                                                                                                                                                                                                                                                            <div className="w-full max-w-sm">
                                                                                                                                                                                                                                                                                      <div className="mb-8 md:hidden">
                                                                                                                                                                                                                                                                                                  <Brand />
                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                      <h1 className="font-heading text-2xl font-semibold text-midnight">
                                                                                                                                                                                                                                                                                                                                  {title}
                                                                                                                                                                                                                                                                                                                                            </h1>
                                                                                                                                                                                                                                                                                                                                                      <p className="mt-1 text-sm">{subtitle}</p>
                                                                                                                                                                                                                                                                                                                                                                <div className="mt-8">{children}</div>
                                                                                                                                                                                                                                                                                                                                                                          <p className="mt-6 text-sm">{footer}</p>
                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                        </section>
                                                                                                                                                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                                                              }