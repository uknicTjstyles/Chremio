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
                                    className="rounded-lg border border-cloud bg-white px-4 py-2 text-sm font-medium text-midnight hover:border-evergreen"
                                        >
                                              Sign out
                                                  </button>
                                                    );
                                                    }