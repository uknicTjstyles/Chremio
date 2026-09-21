import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();
    const firstName = session?.name.split(" ")[0];

      return (
          <div>
                <h1 className="font-heading text-2xl font-semibold text-midnight">
                        Welcome, {firstName}
                              </h1>
                                    <p className="mt-2">Your dashboard is coming next.</p>
                                        </div>
                                          );
                                          }