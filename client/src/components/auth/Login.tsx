"use client";

import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/authActions";
import { SubmitButton } from "../common/SubmitBtn";
import { useActionState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
function Login() {
  const initState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };
  const [state, formAction] = useActionState(loginAction, initState);
  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message || "An unexpected error occurred.");
    } else if (state.status === 200) {
      toast.success(state.message || "Login successful");
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);
  return (
    <form className="space-y-5" noValidate action={formAction}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
        />
        <span className="text-red-500">{state?.errors?.email}</span>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
        />
        <span className="text-red-500">{state?.errors?.password}</span>
      </div>

      <div className="text-right">
        <Link
          href="/forget-password"
          className="text-sm text-purple-600 hover:text-purple-700 dark:hover:text-purple-400 font-medium">
          Forgot password?
        </Link>
      </div>

      <SubmitButton text="Login" />
    </form>
  );
}

export default Login;
