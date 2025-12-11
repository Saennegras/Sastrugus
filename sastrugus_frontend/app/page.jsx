import Image from "next/image";
import Link from "next/link";
import HeroSection from "./_components/HeroSection";
import InfoBlock from "./_components/InfoBlock";

export default function Home() {

  const heroHeadline = "Csatlakozz a Sastrugus Műhely közösséghez";
  
  const infoBlockData  = {
    headline: "A műhelyről",
    text: (
      <p className="copy">
        .........................
      </p>
    ),

    reversed: false,
  };
  return (
    <main>
      <HeroSection headline={heroHeadline}/>
      <InfoBlock data={infoBlockData} />
    </main>
  )
}
