import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/session";

export default async function SignUpPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start managing your money the smart way."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-evergreen underline">
            Sign in
          </Link>
        </>
      }
    >
      <AuthForm mode="sign-up" />
    </AuthShell>
  );
}
