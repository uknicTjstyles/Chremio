import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/session";

export default async function SignInPage() {
  if (await getSession()) redirect("/dashboard");

    return (
        <AuthShell
              title="Welcome back"
                    subtitle="Sign in to continue to your finances."
                          footer={
                                  <>
                                            Don&apos;t have an account?{" "}
                                                      <Link href="/sign-up" className="font-medium text-evergreen underline">
                                                                  Sign up
                                                                            </Link>
                                                                                    </>
                                                                                          }
                                                                                              >
                                                                                                    <AuthForm mode="sign-in" />
                                                                                                        </AuthShell>
                                                                                                          );
                                                                                                          }