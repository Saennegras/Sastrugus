import Image from "next/image";
import HeroSection from "./_components/HeroSection";
import InfoBlock from "./_components/InfoBlock";

export default function Home() {
  const heroHeadline = (
    <>
      <h1>Join the Sastrugus</h1>
      <h1>Workshop Community</h1>
    </>
  );
  
  const infoBlockData  = {
    headline: "the workshop",
    text: (
      <p className="copy">
        .........................
      </p>
    ),
    button: <button className="btn btn--medium btn--turqouise"></button>,
    reversed: false,
  };
  return (
    <main>
      <HeroSection headline={heroHeadline}/>
      <InfoBlock data={infoBlockData} />
    </main>
  )
}
