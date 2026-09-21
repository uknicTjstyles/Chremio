"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const router = useRouter();

    async function logout() {
        try {
              await fetch("/api/auth/logout", { method: "POST" });
                    toast.success("You've been signed out.");
                          router.push("/sign-in");
                                router.refresh();
                                    } catch {
                                          toast.error("Could not sign out. Try again.");
                                              }
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