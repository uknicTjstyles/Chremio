import Image from "next/image";
import IconTransparent from "../app/icon-transparent.png";
export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
      <div role="status" className="flex flex-col items-center gap-3">
            <div className="relative h-14 w-14">
                    <span className="absolute inset-0 animate-spin rounded-full border-2 border-line border-t-evergreen" />
                            <Image
                                      src={IconTransparent}
                                                alt=""
                                                          width={147}
                                                                    height={167}
                                                                              className="absolute inset-0 m-auto h-6 w-auto"
                                                                                      />
                                                                                            </div>
                                                                                                  <span className="text-sm text-muted">{label}...</span>
                                                                                                      </div>
                                                                                                        );
                                                                                                        }