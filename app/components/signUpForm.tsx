"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";
import Link from "next/link";

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
    <div className={"flex items-center justify-center h-screen w-screen"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-black">
        <input
          name="name"
          type="text"
          placeholder="Display name"
          onChange={handleChangeName}
        />
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
          Sign Up!
        </button>
        <Link href="/signin" className="bg-white text-center">
          Already have account? Sign in!
        </Link>
      </form>
    </div>
  );
}
