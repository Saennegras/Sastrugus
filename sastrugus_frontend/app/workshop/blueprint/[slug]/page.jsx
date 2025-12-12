"use client";

import { useEffect, useState } from "react";
import { useAuth } from '/context/AuthContext';
import {getLastPartofSlug} from '../../utils/getLastPartOfSlug';
import Title from "../../../_components/title";
import Description from "../../../_components/description";
import MaterialRequirement from "../../../_components/materialRequirement";
import Steps from "../../../_components/steps";
import Video from "@/app/_components/video";

export default function Page({ params }) {
    const { user } = useAuth();
    const [workshops, setWorkshops] = useState([]);
    const [meta, setMeta] = useState([]);
    const [loading, setLoading] = useState(true);

    const slug = params.slug;
    const documentId = getLastPartofSlug(slug);

    useEffect(() => {
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workshops/${slug}?populate=*`)
                .then((res) => res.json())
                .then((data) => {
                    setWorkshops(data.data);
                    setMeta(data.meta);
                    setLoading(false);
                    console.log(data.data)
                })
        } catch (err) {
            console.error("Error loading workshop category content:", err);
        }
    }, []);

    if (loading) return <p>Betöltés...</p>;

    const isPremiumLocked = !user && workshops.isPremium;

    return (
        <main>
            <Title title={workshops.title} />
            <Description description={workshops.description} />
            <MaterialRequirement materialRequirement={workshops.materialRequirement} />

            {isPremiumLocked ? (
                <div style={{
                    padding: "20px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    marginTop: "20px"
                }}>
                    <h3>Ez egy prémium workshop</h3>
                    <p>Jelentkezz be a megtekintéshez vagy vásárold meg a hozzáférést.</p>
                </div>
            ) : (
                <Steps steps={workshops.steps} />
            )}
            <Video video={workshops.video}/>
        </main>
    );
}