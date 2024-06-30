import Record from "../../components/record";
import ProgressCreateForm from "../../components/progressCreateForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { db } from "@/app/lib/db";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Page({ params }: { params: { type: string } }) {
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

  const { type } = params;

  const formMatchPercent = 60.23;

  return (
    <div
      className={`${inter.className} bg-[#1E1E1E] w-screen h-screen flex items-center justify-center`}
    >
      <div className="flex flex-row gap-8 items-start">
        <Record />
        <ProgressCreateForm
          formMatchPercent={formMatchPercent}
          userId={user.id}
          type={type}
        />
      </div>
    </div>
  );
}
