"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-fg outline-none placeholder:text-muted focus:border-evergreen focus:ring-2 focus:ring-evergreen/30 disabled:opacity-60";

  export default function ProfileForm({
    name,
      email,
      }: {
        name: string;
          email: string;
          }) {
            const router = useRouter();
              const [saving, setSaving] = useState(false);
                const [message, setMessage] = useState<{
                    kind: "ok" | "error";
                        text: string;
                          } | null>(null);

                            async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
                                e.preventDefault();
                                    setMessage(null);
                                        setSaving(true);

                                            const data = new FormData(e.currentTarget);
                                                const res = await fetch("/api/profile", {
                                                      method: "PATCH",
                                                            headers: { "Content-Type": "application/json" },
                                                                  body: JSON.stringify({ name: data.get("name") }),
                                                                      });
                                                                          const json = await res.json().catch(() => ({}));
                                                                              setSaving(false);

                                                                                  if (!res.ok) {
                                                                                        setMessage({ kind: "error", text: json.error ?? "Could not save." });
                                                                                              return;
                                                                                                  }
                                                                                                      setMessage({ kind: "ok", text: "Name updated." });
                                                                                                          router.refresh(); // updates the name in the sidebar and menu
                                                                                                            }

                                                                                                              return (
                                                                                                                  <form onSubmit={onSubmit} className="space-y-4">
                                                                                                                        <label className="block text-sm font-medium text-fg">
                                                                                                                                Full name
                                                                                                                                        <input
                                                                                                                                                  name="name"
                                                                                                                                                            type="text"
                                                                                                                                                                      defaultValue={name}
                                                                                                                                                                                required
                                                                                                                                                                                          minLength={2}
                                                                                                                                                                                                    maxLength={60}
                                                                                                                                                                                                              className={inputClass}
                                                                                                                                                                                                                      />
                                                                                                                                                                                                                            </label>
                                                                                                                                                                                                                                  <label className="block text-sm font-medium text-fg">
                                                                                                                                                                                                                                          Email address
                                                                                                                                                                                                                                                  <input value={email} disabled className={inputClass} readOnly />
                                                                                                                                                                                                                                                        </label>

                                                                                                                                                                                                                                                              {message && (
                                                                                                                                                                                                                                                                      <p
                                                                                                                                                                                                                                                                                role={message.kind === "error" ? "alert" : "status"}
                                                                                                                                                                                                                                                                                          className={`text-sm ${
                                                                                                                                                                                                                                                                                                      message.kind === "error" ? "text-danger" : "text-evergreen"
                                                                                                                                                                                                                                                                                                                }`}
                                                                                                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                                                                                                                  {message.text}
                                                                                                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                                                                                                                )}

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