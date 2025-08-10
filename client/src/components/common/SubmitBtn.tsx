"use client";

import { useFormStatus } from "react-dom";
import { LoadingButton } from "../ui/loading-button";
type ButtonProps = {
  text: string;
};
export function SubmitButton({ text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      disabled={pending}
      loading={pending}
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-md shadow-md hover:from-purple-700 hover:to-blue-600 transition duration-300 cursor-pointer">
      {text}
    </LoadingButton>
  );
}
