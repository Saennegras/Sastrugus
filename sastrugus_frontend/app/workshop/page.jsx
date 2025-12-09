import HeroSection from "../_components/HeroSection";
import InfoBlock from "../_components/InfoBlock";

export default function Home() {
  const heroHeadline = (
    <>
      <h1>Sastrugus</h1>
    </>
  );

  const workshopCategories = [
    { display: "Alkotás", slug: "creation" },
    { display: "Kalligráfia", slug: "calligraphy" },
    { display: "Festészet", slug: "painting" },
    { display: "Digitális művészet", slug: "digital-art" },
  ];

  return (
    <main>
      <HeroSection
        imgSrc="/assets/hero-workshop.png"
        headline={heroHeadline}
        theme="turqouise"
        categories={workshopCategories}
      />
    </main>
  );
}