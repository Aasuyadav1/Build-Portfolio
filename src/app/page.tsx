import Image from "next/image";
import { Button } from "@/components/ui/button";
import Signup from "@/components/signup";


export default function Home() {
  return (
    <main className="flex min-h-screen ">
      <Button>Click me</Button>
        <p>lorem500</p>
      <Signup />
    </main>
  );
}
