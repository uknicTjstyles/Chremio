"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogOutButton";
import logoDark from "../app/logo-for-dark-backgrounds.png";

type IconName = "dashboard" | "transactions" | "analytics" |"profile" | "menu" | "close";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/transactions", label: "Transactions", icon: "transactions" },
  { href: "/analytics", label: "Analytics", icon: "analytics" },
];

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const shapes: Record<IconName, React.ReactNode> = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
    transactions: (
      <>
        <path d="M7 7h13" />
        <path d="M16 3l4 4-4 4" />
        <path d="M17 17H4" />
        <path d="M8 13l-4 4 4 4" />
      </>
    ),
    analytics: (
      <>
        <line x1="6" y1="20" x2="6" y2="12" />
        <line x1="12" y1="20" x2="12" y2="5" />
        <line x1="18" y1="20" x2="18" y2="9" />
      </>
    ),
    profile: (
            <>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                                  </>
                                      ),
    
    menu: (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  );
}

function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <Image
      src={logoDark}
      alt="Chremio"
      width={590}
      height={167}
      className={`${className} w-auto`}
      priority
    />
  );
}

function NavContent({
  user,
  pathname,
  onNavigate,
}: {
  user: { name: string; email: string };
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <nav className="flex flex-col gap-1" aria-label="Main">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);

          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-evergreen/15 text-evergreen"
                  : "text-muted hover:bg-white/5 hover:text-fg"
              }`}
            >
              <Icon name={l.icon} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-line pt-4">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-evergreen/20 text-sm font-semibold text-evergreen">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </>
  );
}

export default function AppShell({
  user,
  children,
}: {
  user: { name: string; email: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-sidebar p-5 md:sticky md:top-0 md:flex">
        <Link href="/dashboard" className="mb-8 block">
          <Logo />
        </Link>
        <NavContent user={user} pathname={pathname} />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-canvas/90 px-4 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-ml-2 rounded-lg p-2 text-fg transition hover:bg-white/5"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>

          <Link href="/dashboard">
            <Logo className="h-7" />
          </Link>

          <span
            aria-hidden="true"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-evergreen/20 text-sm font-semibold text-evergreen"
          >
            {user.name.charAt(0).toUpperCase()}
          </span>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      <div className={`fixed inset-0 z-40 md:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          id="mobile-menu"
          inert={!open}
          className={`absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-line bg-sidebar p-5 transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-lg p-2 text-muted transition hover:bg-white/5 hover:text-fg"
            >
              <Icon name="close" />
            </button>
          </div>

          <NavContent
            user={user}
            pathname={pathname}
            onNavigate={() => setOpen(false)}
          />
        </aside>
      </div>
    </div>
  );
}
