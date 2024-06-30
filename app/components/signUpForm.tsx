"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 3) {
      console.log("Name less than 3 characters long");
      return;
    }

    if (!validator.isEmail(email)) {
      console.log("Email invalid");
      return;
    }

    if (password.length < 8) {
      console.log("Password less than 8 characters");
      return;
    }

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      console.error("Registration went wrong");
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen w-screen ${inter.className} bg-[#1E1E1E]`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <p className={"text-left text-white text-3xl"}>Sign Up</p>
        <input
          name="name"
          type="text"
          placeholder="Display name"
          onChange={handleChangeName}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleChangeEmail}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChangePassword}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <button
          type="submit"
          className="rounded p-1 transition duration-300 transform bg-white hover:bg-[#B2B2B2] "
        >
          Sign Up
        </button>
        <p className="text-white text-center">or</p>
        <Link href="/signin" className="text-white underline text-center">
          Sign In
        </Link>
      </form>
    </div>
  );
}
