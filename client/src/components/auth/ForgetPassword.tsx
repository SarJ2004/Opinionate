"use client";

import React from "react";
import { useEffect } from "react";
import { forgetPasswordAction } from "@/actions/authActions";
import { SubmitButton } from "../common/SubmitBtn";
import { useActionState } from "react";
import { toast } from "sonner";
function ForgetPassword() {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(forgetPasswordAction, initState);
  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message || "An unexpected error occurred.");
    } else if (state.status === 200) {
      toast.success(state.message || "Login successful");
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

      <SubmitButton text="Login" />
    </form>
  );
}

export default ForgetPassword;
