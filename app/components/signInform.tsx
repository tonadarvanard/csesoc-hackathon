"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      className={`flex flex-col items-center justify-center h-screen w-screen ${inter.className} bg-[#1E1E1E]`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <p className={"text-left text-white text-3xl"}>Sign In</p>
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChangeEmail}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          onChange={handleChangePassword}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <button type="submit" className="bg-white rounded p-1">
          Sign In
        </button>
        <p className="text-white text-center">or</p>
        <Link href="/signup" className="text-white underline text-center">
          Sign Up
        </Link>
      </form>
    </div>
  );
}
