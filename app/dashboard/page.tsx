import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/db";
import SignOutButton from "../components/signOutButton";
import Link from "next/link";
import DeleteProgressButton from "../components/deleteProgressButton";
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

  const progressIds = user.progressIds;
  let progs = await db.progress.findMany({
    where: { id: { in: progressIds } },
  });
  progs = progs.reverse();

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

        <div className="text-4xl">Your Fitness Progress</div>

        {progs.length === 0 && (
          <div className="text-xl">No Progress Recorded!</div>
        )}

        <div className="flex flex-col gap-4 text-lg w-[500px]">
          {progs.map((prog, i) => (
            <div
              key={i}
              className="relative border flex flex-col gap-1 p-4 bg-[#D9D9D9] text-black rounded p-6"
            >
              <DeleteProgressButton id={prog.id} />
              <p>{`Time: ${prog.timestamp
                .toLocaleString()
                .replace(/,/g, " -")}`}</p>
              <p>{`Exercise: ${prog.exerciseName}`}</p>
              <p>{`Form Match: ${prog.formMatchPercent}%`}</p>
              <p>{`Weight: ${prog.weight}kg`}</p>
              <p>{`Reps: ${prog.reps}`}</p>
              <p>{`Sets: ${prog.sets}`}</p>
              <p>{`RPE: ${prog.rpe ?? "-"}`}</p>
            </div>
          ))}
        </div>

        <Link
          href="/record"
          className="bg-white rounded p-2 text-black transition duration-300 transform hover:bg-[#B2B2B2] "
        >
          Analyze My Form!
        </Link>

        <SignOutButton />
      </div>
    </div>
  );
};

export default Page;
