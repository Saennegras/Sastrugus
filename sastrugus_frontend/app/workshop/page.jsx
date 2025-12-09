import HeroSection from "../_components/HeroSection";
import InfoBlock from "../_components/InfoBlock";

export default function Home() {
    const heroHeadline = (
    <>
      <h1>Join the Sastrugus</h1>
      <h1>Workshop Community</h1>
    </>
    );
  return (
    <main>
      <HeroSection headline={heroHeadline}/>
      <InfoBlock/>
    </main>
  )
}