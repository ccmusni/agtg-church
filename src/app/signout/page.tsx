"use client";

import ReduxProvider from "@/store/redux-provider";
import SignoutForm from "./signout-form";

export default function Logout() {
  return (
    <ReduxProvider>
      <SignoutForm />
    </ReduxProvider>
  );
}
