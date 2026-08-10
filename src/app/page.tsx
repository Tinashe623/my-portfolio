import { Metadata } from "next";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home");
}
