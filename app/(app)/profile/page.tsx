import { redirect } from "next/navigation";
import PasswordForm from "@/components/PasswordForm";
import ProfileForm from "@/components/ProfileForm";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import User from "@/models/User";

export const metadata = { title: "Profile | Chremio" };

export default async function ProfilePage() {
  const session = await getSession();
    if (!session) redirect("/sign-in");

      await connectDB();
        const user = (await User.findById(session.userId).lean()) as {
            name: string;
                email: string;
                    createdAt: Date;
                      } | null;
                        if (!user) redirect("/sign-in");

                          const memberSince = new Date(user.createdAt).toLocaleDateString("en-GB", {
                              month: "long",
                                  year: "numeric",
                                    });

                                      return (
                                          <div className="max-w-2xl">
                                                <h1 className="font-heading text-2xl font-semibold text-fg">Profile</h1>
                                                      <p className="text-sm text-muted">
                                                              Manage your account. Member since {memberSince}.
                                                                    </p>

                                                                          <section className="mt-6 rounded-xl border border-line bg-surface p-5 sm:p-6">
                                                                                  <h2 className="mb-4 font-heading text-lg font-semibold text-fg">
                                                                                            Personal information
                                                                                                    </h2>
                                                                                                            <ProfileForm name={user.name} email={user.email} />
                                                                                                                  </section>

                                                                                                                        <section className="mt-6 rounded-xl border border-line bg-surface p-5 sm:p-6">
                                                                                                                                <h2 className="mb-4 font-heading text-lg font-semibold text-fg">
                                                                                                                                          Change password
                                                                                                                                                  </h2>
                                                                                                                                                          <PasswordForm />
                                                                                                                                                                </section>
                                                                                                                                                                    </div>
                                                                                                                                                                      );
                                                                                                                                                                      }