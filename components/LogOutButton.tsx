"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" });
            router.push("/sign-in");
                router.refresh();
                  }

                    return (
                        <button
                              onClick={logout}
                                    className="w-full rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-fg transition hover:border-danger/60 hover:text-danger"
                                        >
                                              Sign out
                                                  </button>
                                                    );
                                                    }