"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Field } from "@/components/Field";

export default function ProfileForm({
  name,
    email,
    }: {
      name: string;
        email: string;
        }) {
          const router = useRouter();
            const [saving, setSaving] = useState(false);

              async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
                  e.preventDefault();
                      const newName = new FormData(e.currentTarget).get("name");
                          setSaving(true);

                              try {
                                    const res = await fetch("/api/profile", {
                                            method: "PATCH",
                                                    headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ name: newName }),
                                                                  });
                                                                        const json = await res.json().catch(() => ({}));

                                                                              if (!res.ok) {
                                                                                      toast.error(json.error ?? "Could not save your changes.");
                                                                                              return;
                                                                                                    }
                                                                                                          toast.success("Your name has been updated.");
                                                                                                                router.refresh(); // updates the name in the sidebar and menu
                                                                                                                    } catch {
                                                                                                                          toast.error("Network error. Check your connection and try again.");
                                                                                                                              } finally {
                                                                                                                                    setSaving(false);
                                                                                                                                        }
                                                                                                                                          }

                                                                                                                                            return (
                                                                                                                                                <form onSubmit={onSubmit} className="space-y-4">
                                                                                                                                                      <Field
                                                                                                                                                              label="Full name"
                                                                                                                                                                      icon="user"
                                                                                                                                                                              name="name"
                                                                                                                                                                                      type="text"
                                                                                                                                                                                              defaultValue={name}
                                                                                                                                                                                                      required
                                                                                                                                                                                                              minLength={2}
                                                                                                                                                                                                                      maxLength={60}
                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                  <Field
                                                                                                                                                                                                                                          label="Email address"
                                                                                                                                                                                                                                                  icon="mail"
                                                                                                                                                                                                                                                          type="email"
                                                                                                                                                                                                                                                                  value={email}
                                                                                                                                                                                                                                                                          readOnly
                                                                                                                                                                                                                                                                                  disabled
                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                                                                                      type="submit"
                                                                                                                                                                                                                                                                                                              disabled={saving}
                                                                                                                                                                                                                                                                                                                      className="rounded-lg bg-evergreen px-5 py-2.5 text-sm font-semibold text-canvas transition hover:bg-mint disabled:opacity-60"
                                                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                                                    {saving ? "Saving..." : "Save changes"}
                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                              </form>
                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                }