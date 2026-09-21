"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Thin green bar at the top of the screen while a page is loading
export default function NavigationProgress() {
  const pathname = usePathname();
    const [loading, setLoading] = useState(false);
      const [prevPath, setPrevPath] = useState(pathname);

        // The page changed, so the navigation is finished
          if (pathname !== prevPath) {
              setPrevPath(pathname);
                  setLoading(false);
                    }

                      useEffect(() => {
                          const onClick = (e: MouseEvent) => {
                                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                                        return;
                                              }
                                                    const link = (e.target as Element).closest("a");
                                                          if (!link || link.target === "_blank" || link.hasAttribute("download")) {
                                                                  return;
                                                                        }

                                                                              const url = new URL(link.href, window.location.href);
                                                                                    if (url.origin !== window.location.origin) return;
                                                                                          if (url.pathname === window.location.pathname) return;

                                                                                                setLoading(true);
                                                                                                      window.setTimeout(() => setLoading(false), 10000); // safety net
                                                                                                          };

                                                                                                              document.addEventListener("click", onClick, true);
                                                                                                                  return () => document.removeEventListener("click", onClick, true);
                                                                                                                    }, []);

                                                                                                                      if (!loading) return null;

                                                                                                                        return (
                                                                                                                            <div
                                                                                                                                  aria-hidden="true"
                                                                                                                                        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
                                                                                                                                            >
                                                                                                                                                  <div className="nav-progress h-full bg-evergreen shadow-[0_0_8px_var(--color-evergreen)]" />
                                                                                                                                                      </div>
                                                                                                                                                        );
                                                                                                                                                        }