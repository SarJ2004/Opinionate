import ForgetPassword from "@/components/auth/ForgetPassword";
import React from "react";

function ForgetPass() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-blue-100 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Don't worry! Just fill in your email and we will send you a link to
          reset your password.
        </p>
        <ForgetPassword />
      </div>
    </div>
  );
}

export default ForgetPass;
