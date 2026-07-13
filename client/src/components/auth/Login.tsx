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

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm transition-colors duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
    </form>
  );
}

export default Login;
