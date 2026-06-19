import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutContent } from "@/components/AboutContent";

export const metadata = {
  title: "About Us | A.G.M College of Engineering & Technology",
  description:
    "Learn about A.G.M College's vision, mission, core values and messages from our Founder, President and Principal.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
