import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: { email: `${session.user.email}` },
  });

  if (!user) {
    return <div>User not found...</div>;
  }

  const exercises = ["Bench Press", "Squat", "Deadlift"];

  return (
    <div className={`${inter.className} bg-[#1E1E1E] w-screen h-screen`}>
      <div className={`flex flex-col gap-5 items-center`}>
        <div
          className={`w-full flex flex-col items-left bg-[#474053] drop-shadow-lg text-2xl p-4 gap-1`}
        >
          <p className="text-3xl">Hello,</p>
          <p>{user.name}</p>
          <p className="text-base">{user.email}</p>
        </div>

        <div className="text-4xl">Choose an Exercise!</div>

        <div className="flex flex-col gap-4 text-lg text-center w-[300px]">
          {exercises.map((exercise, i) => (
            <Link
              key={i}
              className="relative border flex flex-col gap-1 p-4 bg-[#D9D9D9] text-black rounded p-6"
              href={`/record/${exercise.toLowerCase().replace(/ /g, "")}`}
            >
              {exercise}
            </Link>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="text-lg bg-white rounded p-2 text-black"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default Page;
