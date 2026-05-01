import Navbar from "@/components/Navbar";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "Owner — MotionWall",
  description: "Tentang pembuat MotionWall — koleksi live wallpaper 4K terbaik.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "#050507", minHeight: "100vh" }}>
      <Navbar />
      <AboutClient />
    </main>
  );
}
