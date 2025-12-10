"use client";
import { useState, useEffect, useRef } from 'react'
import Link from "next/link";
import HeroSection from "../_components/HeroSection";
import InfoBlock from "../_components/InfoBlock";

export default function Home() {

    const [data, setData] = useState([])
    const [meta, setMeta] = useState([])
    const infoRefs = useRef({});
    const [isLoading, setLoading] = useState(true)

    const heroHeadline = (
        <>
            <h1>Műhely Kategóriák</h1>
        </>
    );

    const imageSrcs = {
        "1": "/assets/garden.png",
        "2": "/assets/refurbishing.png",
        "3": "/assets/handicraft.png",
    };

  useEffect(() => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workshop-categories`)
        .then((res) => res.json())
        .then((data) => {
          data.data = data.data.map(dataItem => ({ 
              ...dataItem, 
              imagSrc: imageSrcs[dataItem.id.toString()],
              link: `/workshop/categories/${dataItem.documentId}`
          }));
          setData(data.data)
          setMeta(data.meta)
          setLoading(false)

          data.data.forEach(cat => { 
            infoRefs.current[cat.documentId] = 'x';
              //infoRefsTemp[cat.documentId] = useRef(null);
          });
        })
    } catch(err) {
      console.error("Error loading workshop categories:", err);
    }

  }, [])

    // const workshopCategories = [
    //     { display: "Kerti barkács", slug: "garden_crafts" },
    //     { display: "Újrahasznosítás", slug: "refurbishing" },
    //     { display: "Iskolai műhely", slug: "handicraft" },
    // ];

    //const infoRefs = {};
    // workshopCategories.forEach(cat => { 
    //     infoRefs[cat.slug] = useRef(null);
    // });

    const handleScroll = (slug) => {
        infoRefs[slug].current?.scrollIntoView({ behavior: "smooth" });
    };

    // const infoBlocksData = workshopCategories.map((cat, idx) => {
    //     // let imageSrc = "/assets/default.png";
    //     // if(cat.slug === "garden_crafts") imageSrc = "/assets/garden.png";
    //     // if(cat.slug === "refurbishing") imageSrc = "/assets/refurbishing.png";
    //     // if(cat.slug === "handicraft") imageSrc = "/assets/handicraft.png";

    //     return {
    //         headline: cat.display,
    //         text: <p>Itt a {cat.display} leírása...</p>,

    //         button: (
    //             <Link href={`/workshop/categories/${cat.slug}`} className="btn btn--small">
    //                 Tovább
    //             </Link>
    //         ),

    //         image: imageSrc,
    //         reversed: idx === 1,
    //     };
    // });

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No categorties</p>

    console.log(data);
  
    return (
        <main className="w-full flex-1 flex flex-col gap-12 md:gap-24 pb-24 overflow-x-hidden">
            <HeroSection
                imgSrc="/assets/hero-workshop.png"
                headline={heroHeadline}
                theme="turqouise"
                categories={data}
                onCategoryClick={handleScroll}
            />
            <div className="flex flex-col gap-0">
            {data.map((dataItem, idx) => (
                <div
                    key={dataItem.documentId}
                    id={dataItem.documentId}
                >
                    <InfoBlock data={ {...dataItem, headLine: dataItem.categoryName, description: dataItem.categoryDescription, slug: `/workshop/categories/${dataItem.documentId}`, reversed: idx % 2 !== 0} } />
                </div>
            ))}
            </div>
        </main>
    );
}