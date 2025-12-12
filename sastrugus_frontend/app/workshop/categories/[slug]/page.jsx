"use client";

import { useEffect, useState } from "react";
import {getLastPartofSlug} from '../../utils/getLastPartOfSlug';
import InfoBlock from "../../../_components/InfoBlock";
console.log("getLastPartofSlug:", getLastPartofSlug);

export default function Page({ params }) {
    const [workshops, setWorkshops] = useState([]);
    const [meta, setMeta] = useState([]);
    const [loading, setLoading] = useState(true);


    const slug = params.slug;
    const documentID = getLastPartofSlug(slug);

    useEffect(() => {
        // async function fetchWorkshops() {
        //     try {
        //         const res = await fetch(
        //             `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshop-categories/${slug}?populate[workshops][fields][0]=title&populate[workshops][fields][1]=description&populate[workshops][fields][2]=publishedAt`
        //         );
        //         const data = await res.json();

        //         const filtered = data.data.filter(
        //             (w) => w.workshopCategory?.slug === slug
        //         );

        //         setWorkshops(filtered);
        //     } catch (err) {
        //         console.error("Error loading workshops:", err);
        //     } finally {
        //         setLoading(false);
        //     }
        // }

        // fetchWorkshops();

        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workshop-categories/${documentID}?populate[workshops][fields][0]=title&populate[workshops][fields][1]=description&populate[workshops][fields][2]=publishedAt`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkshops(data.data)
                    setMeta(data.meta)
                    setLoading(false)
                    console.log(data.data)
                })
            } catch(err) {
            console.error("Error loading workshop category content:", err);
            }

    }, []);

    if (loading) return <p>Betöltés...</p>;

    return (
        <main>
            <h1>{workshops.categoryName}</h1>

            {workshops.workshops.map((workshop, idx) => {
                const image = workshop?.thumbnail?.url
                    ? `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${workshop.thumbnail.url}`
                    : "/assets/default.png";

                return (
                    <InfoBlock
                        key={workshop.documentId}
                        data={{
                            headLine: workshop.title,
                            description: (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: workshop.description,
                                    }}
                                />
                            ),
                            image,
                            reversed: idx % 2 !== 0,
                            slug: `/workshop/blueprint/${workshop.documentId}`,
                            
                        }}
                    />
                );
            })}
        </main>
    );
}