"use client";

import ReduxProvider from "@/store/redux-provider";
import SignupForm from "./signup-form";

export default function Signup() {
  return (
    <ReduxProvider>
      <SignupForm />
    </ReduxProvider>
  );
}
