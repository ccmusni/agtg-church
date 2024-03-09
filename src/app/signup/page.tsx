"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase";

import { useAppSelector } from "@/store";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignupForm() {
  const authState = useAppSelector((state) => state.auth.authState);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (authState) {
      router.push("/");
    }
  }, []);

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        setSignupError(error.message);
      } else {
        setEmail("");
        setPassword("");

        router.refresh();
        router.push("/signin");
      }
    } catch (e) {
      setSignupError(e.message);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-8">
            <h1 className="h1">Sign up</h1>
          </div>

          <div className="max-w-sm mx-auto">
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="First Name" />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  placeholder="Type your first name here..."
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  placeholder="Type your last name here..."
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Type your email here..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="Type your password here..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" onClick={handleSignUp}>
                Sign up
              </Button>
              {signupError && <p color="red">{signupError}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
