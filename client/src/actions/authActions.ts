"use server";
// server actions are async functions that execute on the server side
import {
  CHECK_CREDENTIALS_URL,
  LOGIN_URL,
  REGISTER_URL,
} from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";
export async function registerAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(REGISTER_URL, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });
    return {
      status: 200,
      message:
        data?.message ??
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

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(LOGIN_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return {
      status: 200,
      message: data?.message ?? "Logging you in...",
      errors: {},
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
          data: {},
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
      data: {},
    };
  }
}
