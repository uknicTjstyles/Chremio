"use client";

import { ToastContainer } from "react-toastify";

export default function Toaster() {
  return (
      <ToastContainer
            position="top-right"
                  autoClose={3500}
                        newestOnTop
                              closeOnClick
                                    pauseOnFocusLoss={false}
                                          theme="dark"
                                                toastClassName="border border-line"
                                                      style={
                                                              {
                                                                        "--toastify-color-dark": "#111b2e",
                                                                                  "--toastify-text-color-dark": "#f1f5f9",
                                                                                            "--toastify-color-success": "#10b981",
                                                                                                      "--toastify-color-error": "#f87171",
                                                                                                                "--toastify-font-family": "var(--font-inter), sans-serif",
                                                                                                                        } as React.CSSProperties
                                                                                                                              }
                                                                                                                                  />
                                                                                                                                    );
                                                                                                                                    }