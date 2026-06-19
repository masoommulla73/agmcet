import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlacementContent } from "@/components/PlacementContent";

export const metadata = {
  title: "Placement | A.G.M College of Engineering & Technology",
  description:
    "Explore placement cell details, training programs and industry connections at A.G.M College of Engineering & Technology.",
};

export default function PlacementPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <PlacementContent />
      </main>
      <Footer />
    </>
  );
}
