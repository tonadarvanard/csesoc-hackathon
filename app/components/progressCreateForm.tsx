"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProgressCreateForm({
  formMatchPercent,
  userId,
}: {
  formMatchPercent: number;
  userId: number;
}) {
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [rpe, setRpe] = useState<number | null>(null);

  const router = useRouter();

  const handleChangeReps = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(parseInt(e.target.value));
  };

  const handleChangeSets = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSets(parseInt(e.target.value));
  };

  const handleChangeRPE = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRpe(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reps < 1) {
      console.log("Reps must be more than 0");
      return;
    }

    if (sets < 1) {
      console.log("Sets must be more than 0");
      return;
    }

    const res = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formMatchPercent,
        reps,
        sets,
        rpe: rpe || null,
        userId,
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      console.error("Progress creation went wrong");
    }
  };

  return (
    <div className={"flex items-center justify-center h-screen w-screen"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-black">
        <div className="bg-white text-black">{formMatchPercent}</div>
        <input
          name="reps"
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={handleChangeReps}
        />
        <input
          name="sets"
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={handleChangeSets}
        />
        <input
          name="rpe"
          type="number"
          placeholder="RPE"
          onChange={handleChangeRPE}
        />
        <button type="submit" className="bg-white">
          Submit!
        </button>
      </form>
    </div>
  );
}
