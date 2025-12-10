"use client";

import { useEffect, useState } from "react";
import InfoBlock from "../../../_components/InfoBlock";

export default function HandicraftPage() {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    const slug = "handicraft";

    useEffect(() => {
        async function fetchWorkshops() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops?populate=*`
                );
                const data = await res.json();

                const filtered = data.data.filter(
                    (w) => w.workshopCategory?.slug === slug
                );

                setWorkshops(filtered);
            } catch (err) {
                console.error("Error loading workshops:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkshops();
    }, []);

    if (loading) return <p>Betöltés...</p>;

    return (
        <main>
            <h1>Iskolai műhely</h1>

            {workshops.map((workshop, idx) => {
                const image = workshop.thumbnail?.url
                    ? `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${workshop.thumbnail.url}`
                    : "/assets/default.png";

                return (
                    <InfoBlock
                        key={workshop.documentId}
                        data={{
                            headline: workshop.title,
                            text: (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: workshop.shortDescription,
                                    }}
                                />
                            ),
                            image,
                            reversed: idx % 2 !== 0,
                            button: (
                                <a
                                    href={`/workshop/${workshop.documentId}`}
                                    className="btn btn--small"
                                >
                                    Tovább
                                </a>
                            ),
                        }}
                    />
                );
            })}
        </main>
    );
}