import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdmissionsContent } from "@/components/AdmissionsContent";

export const metadata = {
  title: "Admissions | A.G.M College of Engineering & Technology",
  description:
    "Explore admission procedures, intake, eligibility criteria, and apply for B.E. programmes at A.G.M College of Engineering & Technology.",
};

export default function AdmissionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <AdmissionsContent />
      </main>
      <Footer />
    </>
  );
}
