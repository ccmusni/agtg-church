import { useEffect } from "react";
import { useRouter } from "next/navigation";

import supabase from "@/utils/supabase";

import { useAppDispatch, useAppSelector } from "@/store";
import { setAuthState } from "@/store/authSlice";

export default function SignoutForm() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.authState);
  const router = useRouter();

  useEffect(() => {
    if (authState) {
      logout();
    } else {
      router.push("/");
    }
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();

    dispatch(setAuthState(false));
    router.push("/");
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-sm mx-auto">
            <p style={{ textAlign: "center" }}>Logging out...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
