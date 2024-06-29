import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/signin");
  } else {
    return redirect("/dashboard");
  }

  return <div>If you see this, something went wrong...</div>;
}
