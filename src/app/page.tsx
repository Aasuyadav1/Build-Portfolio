import Image from "next/image";
import { Button } from "@/components/ui/button";
import Signup from "@/components/signup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
      <Signup />
    </main>
  );
}
