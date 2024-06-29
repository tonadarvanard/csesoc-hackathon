"use client";
import { db } from "../lib/db";

export default function DeleteProgressButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/progress/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("Deletion successful");
      window.location.reload();
    } else {
      console.error("Deletion went wrong");
    }
  };

  return (
    <button className="bg-white text-black" onClick={handleDelete}>
      Delete
    </button>
  );
}
