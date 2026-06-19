import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgrammesContent } from "@/components/ProgrammesContent";

export const metadata = {
  title: "Academic Programmes | A.G.M College of Engineering & Technology",
  description:
    "Explore our B.E. programmes in Computer Science, AI & Machine Learning, Electronics & Communication, and Civil Engineering.",
};

export default function ProgrammesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <ProgrammesContent />
      </main>
      <Footer />
    </>
  );
}
