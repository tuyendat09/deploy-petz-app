import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginUser, RegisterUser, VerifyEmail } from "@/types/User";

interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    logIn: builder.mutation<LoginUser, LoginUser>({
      query: (formData: LoginUser) => ({
        url: "/login",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),

    signUp: builder.mutation<RegisterUser, RegisterUser>({
      query: (formData: RegisterUser) => ({
        url: "/signup",
        method: "POST",
        body: formData,
      }),
    }),

    verifyEmail: builder.mutation<VerifyEmail, VerifyEmail>({
      query: (formData: VerifyEmail) => ({
        url: "/verify-otp",
        method: "POST",
        body: formData,
      }),
    }),
    resendOTP: builder.mutation<any, string>({
      query: (email: string) => ({
        url: "/resend-otp",
        method: "POST",
        body: { email: email },
      }),
    }),
    forgotPassword: builder.mutation<any, string>({
      query: (email: string) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email: email },
      }),
    }),
    verifyOTPForgetPassword: builder.mutation<any, VerifyEmail>({
      query: (formData: VerifyEmail) => ({
        url: "/verify-otp-forget-password",
        method: "POST",
        body: formData,
      }),
    }),
    resetPassword: builder.mutation<any, ResetPasswordPayload>({
      query: (formData: ResetPasswordPayload) => ({
        url: "/reset-password",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useVerifyOTPForgetPasswordMutation,
  useResetPasswordMutation,
} = authAPI;
