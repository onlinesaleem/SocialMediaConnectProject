// app/signup/page.tsx
"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session) router.push("/dashboard");
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
