"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Field } from "@/components/Field";

export default function PasswordForm() {
  const router = useRouter();
    const [saving, setSaving] = useState(false);

      async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
          e.preventDefault();
              const data = new FormData(e.currentTarget);
                  const currentPassword = String(data.get("currentPassword") ?? "");
                      const newPassword = String(data.get("newPassword") ?? "");
                          const confirmPassword = String(data.get("confirmPassword") ?? "");

                              if (newPassword !== confirmPassword) {
                                    toast.error("The new passwords don't match.");
                                          return;
                                              }

                                                  setSaving(true);
                                                      try {
                                                            const res = await fetch("/api/profile/password", {
                                                                    method: "PUT",
                                                                            headers: { "Content-Type": "application/json" },
                                                                                    body: JSON.stringify({ currentPassword, newPassword }),
                                                                                          });
                                                                                                const json = await res.json().catch(() => ({}));

                                                                                                      if (!res.ok) {
                                                                                                              toast.error(json.error ?? "Could not update your password.");
                                                                                                                      return;
                                                                                                                            }

                                                                                                                                  // The server ended the session, so send them to sign in again
                                                                                                                                        toast.success("Password updated. Please sign in with your new password.");
                                                                                                                                              router.push("/sign-in");
                                                                                                                                                    router.refresh();
                                                                                                                                                        } catch {
                                                                                                                                                              toast.error("Network error. Check your connection and try again.");
                                                                                                                                                                  } finally {
                                                                                                                                                                        setSaving(false);
                                                                                                                                                                            }
                                                                                                                                                                              }

                                                                                                                                                                                return (
                                                                                                                                                                                    <form onSubmit={onSubmit} className="space-y-4">
                                                                                                                                                                                          <Field
                                                                                                                                                                                                  label="Current password"
                                                                                                                                                                                                          icon="lock"
                                                                                                                                                                                                                  name="currentPassword"
                                                                                                                                                                                                                          type="password"
                                                                                                                                                                                                                                  autoComplete="current-password"
                                                                                                                                                                                                                                          required
                                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                                      <Field
                                                                                                                                                                                                                                                              label="New password"
                                                                                                                                                                                                                                                                      icon="lock"
                                                                                                                                                                                                                                                                              name="newPassword"
                                                                                                                                                                                                                                                                                      type="password"
                                                                                                                                                                                                                                                                                              autoComplete="new-password"
                                                                                                                                                                                                                                                                                                      minLength={8}
                                                                                                                                                                                                                                                                                                              required
                                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                                          <Field
                                                                                                                                                                                                                                                                                                                                  label="Confirm new password"
                                                                                                                                                                                                                                                                                                                                          icon="lock"
                                                                                                                                                                                                                                                                                                                                                  name="confirmPassword"
                                                                                                                                                                                                                                                                                                                                                          type="password"
                                                                                                                                                                                                                                                                                                                                                                  autoComplete="new-password"
                                                                                                                                                                                                                                                                                                                                                                          minLength={8}
                                                                                                                                                                                                                                                                                                                                                                                  required
                                                                                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                                                                                                                                                                                      type="submit"
                                                                                                                                                                                                                                                                                                                                                                                                              disabled={saving}
                                                                                                                                                                                                                                                                                                                                                                                                                      className="rounded-lg bg-evergreen px-5 py-2.5 text-sm font-semibold text-canvas transition hover:bg-mint disabled:opacity-60"
                                                                                                                                                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                                                                                                                                                    {saving ? "Updating..." : "Update password"}
                                                                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                              </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                }