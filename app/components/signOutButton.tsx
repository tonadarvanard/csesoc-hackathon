"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="bg-white rounded p-2 text-black transition duration-300 transform hover:bg-[#B2B2B2] "
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
