"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProgressCreateForm({
  formMatchPercent,
  userId,
  type,
}: {
  formMatchPercent: number;
  userId: number;
  type: string;
}) {
  const [exerciseName, setExerciseName] = useState(
    type.charAt(0).toUpperCase() + type.slice(1)
  );
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [rpe, setRpe] = useState<number | null>(null);

  const router = useRouter();

  const handleChangeExerciseName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(e.target.value));
  };

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

    if (exerciseName.length < 1) {
      console.log("Exercise name can't be empty!");
      return;
    }

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
        exerciseName,
        formMatchPercent,
        weight,
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
    <div className={"flex items-center justify-center"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <div className="rounded p-2 bg-[#FEF7FF]">{`${formMatchPercent}%`}</div>
        <input
          name="exerciseName"
          type="text"
          placeholder="Exercise name"
          value={exerciseName}
          onChange={handleChangeExerciseName}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          min={0}
          onChange={handleChangeWeight}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="reps"
          type="number"
          placeholder="Reps"
          min={1}
          onChange={handleChangeReps}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="sets"
          type="number"
          placeholder="Sets"
          min={1}
          onChange={handleChangeSets}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <input
          name="rpe"
          type="number"
          placeholder="RPE"
          min={1}
          max={10}
          onChange={handleChangeRPE}
          className="rounded p-2 bg-[#FEF7FF]"
        />
        <button
          type="submit"
          className="rounded p-2 bg-white transition duration-300 transform hover:bg-[#B2B2B2] "
        >
          Submit Progress!
        </button>
      </form>
    </div>
  );
}
