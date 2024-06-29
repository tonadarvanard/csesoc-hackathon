"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="bg-white rounded p-2 text-black"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
