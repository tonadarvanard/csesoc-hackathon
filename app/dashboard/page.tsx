import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/db";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Please log in!</div>;
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
      <div className="flex flex-col">
        <div>Name: {user.id}</div>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
      </div>

      <div className="flex flex-col gap-4">
        {progs.map((prog, i) => (
          <div key={i} className="border">
            <p>{prog.id}</p>
            <p>{`${prog.timestamp}`}</p>
            <p>{prog.formMatchPercent}</p>
            <p>{prog.reps}</p>
            <p>{prog.sets}</p>
            <p>{prog.rpe ?? "No rpe"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
