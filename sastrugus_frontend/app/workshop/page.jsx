"use client";
import { useRef } from "react";
import Link from "next/link";
import HeroSection from "../_components/HeroSection";
import InfoBlock from "../_components/InfoBlock";

export default function Home() {
  const heroHeadline = (
    <>
      <h1>Kategóriák</h1>
    </>
  );

  const workshopCategories = [
    { display: "Kerti barkács", slug: "garden_crafts" },
    { display: "Újrahasznosítás", slug: "refurbishing" },
    { display: "Iskolai műhely", slug: "handicraft" },
  ];

  const infoRefs = {};
  workshopCategories.forEach(cat => {
    infoRefs[cat.slug] = useRef(null);
  });

  const handleScroll = (slug) => {
    infoRefs[slug].current?.scrollIntoView({ behavior: "smooth" });
  };

const infoBlocksData = workshopCategories.map(cat => ({
  headline: cat.display,
  text: <p>Itt a {cat.display} leírása...</p>,
  button: (
    <Link href={`/workshop/${cat.slug}`} className="btn btn--small">
      Tovább
    </Link>
  ),
}));

  return (
    <main>
      <HeroSection
        imgSrc="/assets/hero-workshop.png"
        headline={heroHeadline}
        theme="turqouise"
        categories={workshopCategories}
        onCategoryClick={handleScroll}
      />

      {infoBlocksData.map((data, idx) => (
        <div 
        key={workshopCategories[idx].slug} 
        ref={infoRefs[workshopCategories[idx].slug]}>
          <InfoBlock data={data} />
        </div>
      ))}
    </main>
  );
}