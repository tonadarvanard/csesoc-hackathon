import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/db";
import SignOutButton from "../components/signOutButton";
import Link from "next/link";
import DeleteProgressButton from "../components/deleteProgressButton";
import { redirect } from "next/navigation";

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

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col items-center">
          <h1>{user.name}</h1>
          <div>{user.email}</div>
        </div>

        {progs.length === 0 && <div>No Progress Recorded!</div>}

        <div className="flex flex-col gap-4">
          {progs.map((prog, i) => (
            <div key={i} className="border p-4">
              <DeleteProgressButton id={prog.id} />
              <p>{`${prog.timestamp.toLocaleDateString(
                "en-GB"
              )}, ${prog.timestamp.getHours()}:${prog.timestamp.getHours()}`}</p>
              <p>{`Form Match: ${prog.formMatchPercent}%`}</p>
              <p>{`Reps: ${prog.reps}`}</p>
              <p>{`Sets: ${prog.sets}`}</p>
              <p>{`RPE: ${prog.rpe ?? "No rpe"}`}</p>
            </div>
          ))}
        </div>

        <Link href="/record" className="bg-white text-black p-2">
          Analyze My Form!
        </Link>

        <SignOutButton />
      </div>
    </div>
  );
};

export default Page;
