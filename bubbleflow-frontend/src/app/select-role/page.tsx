//High contrast compliant
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleEmployeeLogin = () => {
    router.push("/create-order");
  };
  const handleManagerLogin = () => {
    router.push("/edit-menu");
  };

  return (
    <main className="flex flex-col items-center px-16 bg-background text-foreground min-h-screen">
      <div className="w-96 mt-16">
        <p className="text-3xl font-bold mb-8 text-center">I am a...</p>
        <div className="flex flex-col gap-4">
          <Button className="bg-primary text-primary-foreground hover:bg-muted" onClick={handleEmployeeLogin}>
            Customer
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-muted" onClick={handleEmployeeLogin}>
            Employee
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-muted" onClick={handleManagerLogin}>
            Manager
          </Button>
        </div>
      </div>
    </main>
  );
}
