import SignUpForm from "../components/signUpForm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return (
    <div>
      <h1
        className={`fixed text-5xl ${inter.className} text-center w-full mt-[100px]`}
      >
        Start improving your form today!
      </h1>
      <SignUpForm />
    </div>
  );
}
