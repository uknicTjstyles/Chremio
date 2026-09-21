"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoDark from "../app/logo-for-dark-backgrounds.png";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Transactions" },
  { href: "/analytics", label: "Analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      pathname.startsWith(href)
        ? "bg-white/10 text-white"
        : "text-white/70 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col bg-midnight p-5 md:flex">
        <Link href="/dashboard" className="mb-8 block">
          <Image
            src={logoDark}
            alt="Chremio"
            width={590}
            height={167}
            className="h-9 w-auto"
            priority
          />
        </Link>
                                                                                                                                                                      <nav className="flex flex-col gap-1">
                                                                                                                                                                                {links.map((l) => (
                                                                                                                                                                                            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                                                                                                                                                                                                          {l.label}
                                                                                                                                                                                                                      </Link>
                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                        </nav>
                                                                                                                                                                                                                                                <p className="mt-auto text-xs text-white/50">
                                                                                                                                                                                                                                                          Better money, brighter tomorrow.
                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                        </aside>

                                                                                                                                                                                                                                                                              <nav className="flex items-center gap-1 overflow-x-auto bg-midnight px-3 py-2 md:hidden">
                                                                                                                                                                                                                                                                                      {links.map((l) => (
                                                                                                                                                                                                                                                                                                <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                                                                                                                                                                                                                                                                                                            {l.label}
                                                                                                                                                                                                                                                                                                                      </Link>
                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                    </nav>
                                                                                                                                                                                                                                                                                                                                        </>
                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                          }