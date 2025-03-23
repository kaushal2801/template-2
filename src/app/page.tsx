import Link from "next/link";
import ImageGenerator from "@/app/components/ImageGenerator";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <ImageGenerator />
    </main>
  );
}
