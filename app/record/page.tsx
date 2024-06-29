import Record from "../components/record";
import ProgressCreateForm from "../components/progressCreateForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "@/app/lib/db";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <div>Please sign in..</div>;
  }
  const user = await db.user.findUnique({
    where: { email: `${session.user.email}` },
  });

  if (!user) {
    return <div>User not found...</div>;
  }

  const formMatchPercent = 50.12;

  return (
    <div className="flex flex-row">
      <Record />
      <ProgressCreateForm
        formMatchPercent={formMatchPercent}
        userId={user.id}
      />
    </div>
  );
}
