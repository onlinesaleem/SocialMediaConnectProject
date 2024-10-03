// app/components/SignupForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setSuccess("Signup successful! Logging you in...");
        setEmail("");
        setPassword("");
        setName("");

        // Automatically sign in the user
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signInRes?.error) {
          setError(signInRes.error);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name (optional)
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </form>

      {/* Redirect to Login */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
