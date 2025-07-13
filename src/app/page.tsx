import ScrollProvider from "@/components/providers/ScrollProvider";
import ClientComponents from "@/components/providers/ClientComponents";
import MainContent from "@/components/layout/MainContent";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <ScrollProvider>
      <ClientComponents />
      <Navbar />
      <MainContent />
    </ScrollProvider>
  );
}
