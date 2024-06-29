"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const signInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInData?.error) {
        console.log(signInData.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div
      className={"flex flex-col items-center justify-center h-screen w-screen"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-black">
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          onChange={handleChangePassword}
        />
        <button type="submit" className="bg-white">
          Sign In!
        </button>
        <Link href="/signup" className="bg-white text-center">
          Sign up instead?
        </Link>
      </form>
    </div>
  );
}
