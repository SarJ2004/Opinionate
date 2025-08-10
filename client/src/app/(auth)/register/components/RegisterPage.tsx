"use client";
import React, { useState } from "react";
import Link from "next/link";
import Register from "@/components/auth/Register";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-blue-100 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Sign up to get started
        </p>

        <Register />

        <p className="center text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <strong>
            <Link href="/login" className="underline">
              Log In
            </Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
