import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Please log in!</div>;
  }

  return <div>Welcome to your Dashboard, {session?.user?.name}</div>;
};

export default Page;
