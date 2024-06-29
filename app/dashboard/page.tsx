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

  return (
    <div>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col">
          <div>Name: {user.id}</div>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
        </div>

        {progs.length === 0 && <div>No Progress Recorded!</div>}

        <div className="flex flex-col gap-4">
          {progs.map((prog, i) => (
            <div key={i} className="border">
              <DeleteProgressButton id={prog.id} />
              <p>{prog.id}</p>
              <p>{`${prog.timestamp}`}</p>
              <p>{prog.formMatchPercent}</p>
              <p>{prog.reps}</p>
              <p>{prog.sets}</p>
              <p>{prog.rpe ?? "No rpe"}</p>
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
