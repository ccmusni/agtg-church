"use client";
import ReduxProvider from "@/store/redux-provider";
import SigninForm from "./signin-form";
export default function Signin() {
  return (
    <ReduxProvider>
      <SigninForm />
    </ReduxProvider>
  );
}
