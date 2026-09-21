import Image from "next/image";
import Link from "next/link";
import darkLogo from "@/app/logo-for-dark-backgrounds.png";

function Brand() {
  return (
      <Link href="/" className="inline-block">
            <Image
                    src={darkLogo}
                            alt="Chremio"
                                    width={590}
                                            height={167}
                                                    className="h-10 w-auto"
                                                            priority
                                                                  />
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
                                                                                                    <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-line bg-sidebar p-12 md:flex">
                                                                                                            <Brand />
                                                                                                                    <div className="relative">
                                                                                                                              <p className="font-heading text-4xl leading-tight text-fg">
                                                                                                                                          Manage your money.
                                                                                                                                                      <br />
                                                                                                                                                                  Build your future.
                                                                                                                                                                            </p>
                                                                                                                                                                                      <p className="mt-4 max-w-sm text-muted">
                                                                                                                                                                                                  Record what comes in and what goes out, then see where your money
                                                                                                                                                                                                              goes each month.
                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                        <p className="relative text-sm text-muted">
                                                                                                                                                                                                                                                  More than tracking. It&apos;s financial freedom.
                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                                  <div
                                                                                                                                                                                                                                                                            aria-hidden
                                                                                                                                                                                                                                                                                      className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-evergreen/15 blur-3xl"
                                                                                                                                                                                                                                                                                              />
                                                                                                                                                                                                                                                                                                    </aside>

                                                                                                                                                                                                                                                                                                          <section className="flex items-center justify-center p-6">
                                                                                                                                                                                                                                                                                                                  <div className="w-full max-w-sm">
                                                                                                                                                                                                                                                                                                                            <div className="mb-8 md:hidden">
                                                                                                                                                                                                                                                                                                                                        <Brand />
                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                            <h1 className="font-heading text-2xl font-semibold text-fg">
                                                                                                                                                                                                                                                                                                                                                                        {title}
                                                                                                                                                                                                                                                                                                                                                                                  </h1>
                                                                                                                                                                                                                                                                                                                                                                                            <p className="mt-1 text-sm text-muted">{subtitle}</p>
                                                                                                                                                                                                                                                                                                                                                                                                      <div className="mt-8">{children}</div>
                                                                                                                                                                                                                                                                                                                                                                                                                <p className="mt-6 text-sm text-muted">{footer}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                              </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                  </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                    }