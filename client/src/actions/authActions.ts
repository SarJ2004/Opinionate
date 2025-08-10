"use server";
// server actions are async functions that execute on the server side
import { REGISTER_URL } from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";
export async function registerAction(prevState: any, formData: FormData) {
  try {
    await axios.post(REGISTER_URL, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });
    return {
      status: 200,
      message:
        "Account created successfully! Please check your email and verify your email.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
    };
  }
}
