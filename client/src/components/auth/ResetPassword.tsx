"use client";
import React from "react";
import { useEffect } from "react";
import { SubmitButton } from "../common/SubmitBtn";
import { useActionState } from "react";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
function ResetPassword() {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(resetPasswordAction, initState);
  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message || "An unexpected error occurred.");
    } else if (state.status === 422) {
      toast.error(state.message || "Please fix the highlighted errors.");
    } else if (state.status === 200) {
      toast.success(state.message || "Password reset successful");
    }
  }, [state.status]);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  return (
    <form action={formAction} className="flex-col space-y-5">
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
          autoComplete="new-password"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
        />

        <span className="text-red-500">{state?.errors?.password}</span>
      </div>

      <div>
        <label
          htmlFor="confirm_password"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100"
        />
        <span className="text-red-500">{state?.errors?.confirm_password}</span>
      </div>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="token" value={token} />
      <SubmitButton text="Reset Password" />
    </form>
  );
}

export default ResetPassword;
