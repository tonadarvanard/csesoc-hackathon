"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="bg-white text-black" onClick={() => signOut()}>
      Sign out
    </button>
  );
}
