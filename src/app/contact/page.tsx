import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactContent } from "@/components/ContactContent";

export const metadata = {
  title: "Contact Us | A.G.M College of Engineering & Technology",
  description:
    "Get in touch with A.G.M College of Engineering & Technology. Find our address, phone, email, and location map.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
