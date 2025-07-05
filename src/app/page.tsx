import ScrollProvider from "@/components/providers/ScrollProvider";
import ClientComponents from "@/components/providers/ClientComponents";
import MainContent from "@/components/layout/MainContent";
import Navbar from "@/components/navbar";
import CanvasGalaxyBackground from "@/components/background/GalaxyBackground";

export default function Home() {
  return (
    <ScrollProvider>
      <CanvasGalaxyBackground />
      <ClientComponents />
      <Navbar />
      <MainContent />
    </ScrollProvider>
  );
}
