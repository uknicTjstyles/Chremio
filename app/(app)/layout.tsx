import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogOutButton";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/session";

export default async function AppLayout({
  children,
  }: {
    children: React.ReactNode;
    }) {
      const session = await getSession();
        if (!session) redirect("/sign-in");

          return (
              <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                          <div className="min-w-0 flex-1">
                                  <header className="flex items-center justify-end gap-3 border-b border-cloud bg-white px-6 py-3">
                                            <span className="text-sm font-medium text-midnight">
                                                        {session.name}
                                                                  </span>
                                                                            <LogoutButton />
                                                                                    </header>
                                                                                            <main className="p-6">{children}</main>
                                                                                                  </div>
                                                                                                      </div>
                                                                                                        );
                                                                                                        }