"use client";

import { useEffect, useState } from "react";
import MaterialRequirement from "../../../_components/materialRequirement";

export default function Page({ params }) {
    const [workshops, setWorkshops] = useState([]);
    const [meta, setMeta] = useState([]);
    const [loading, setLoading] = useState(true);


    const slug = params.slug;

    useEffect(() => {

        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops/${slug}?populate=*`)
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
            <h1>{workshops.title}</h1>


            <MaterialRequirement materialRequirement={workshops.materialRequirement} />


            <div
                dangerouslySetInnerHTML={{
                 __html: workshops.description,
                }}
            />
            <div
                dangerouslySetInnerHTML={{
                 __html: workshops.steps,
                }}
            />

           
        </main>
    );
}