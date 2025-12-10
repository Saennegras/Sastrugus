import Image from "next/image";
import Link from "next/link";
import HeroSection from "./_components/HeroSection";
import InfoBlock from "./_components/InfoBlock";

export default function Home() {

  const heroHeadline = (
    <>
      <h1>Csatlakozz a Sastrugus</h1>
      <h1>Műhely közösséghez</h1>
    </>
  );
  
  const infoBlockData  = {
    headline: "A műhelyről",
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
