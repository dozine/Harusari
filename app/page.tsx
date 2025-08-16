import { verifyTokenServer } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await verifyTokenServer();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
  return null;
}
