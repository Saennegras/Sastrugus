"use client";

import { useEffect, useState } from "react";
import { useAuth } from "/context/AuthContext";
import { getLastPartofSlug } from "../../utils/getLastPartOfSlug";
import MaterialRequirement from "../../../_components/materialRequirement";
import Steps from "../../../_components/steps";
import Video from "@/app/_components/video";
import PageHeader from "@/app/_components/PageHeader";
import PremiumLockNotice from "@/app/workshop/components/PremiumLockNotice";

export default function Page({ params }) {
  const { user } = useAuth();
  const [workshop, setWorkshop] = useState({});
  const [loading, setLoading] = useState(true);

  const slug = params.slug;
  const documentId = getLastPartofSlug(slug);

  useEffect(() => {
    try {
      fetch(`/api/proxy/workshops/${slug}?populate=*`)
        .then((res) => res.json())
        .then((data) => {
          setWorkshop(data?.data || {});
        })
        .catch((err) => {
          console.error("Error loading workshop content:", err);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Error loading workshop content:", err);
      setLoading(false);
    }
  }, [slug]);

  const isPremium = !!workshop?.isPremium;
  const hasSteps = !!(workshop?.steps && workshop.steps.trim());
  const hasVideo = !!(workshop?.video && workshop.video.trim());
  const hasMaterials = !!(workshop?.materialRequirement && workshop.materialRequirement.trim());
  const hasContent = hasSteps || hasVideo || hasMaterials;
  const isPremiumLocked = isPremium && !hasContent;

  if (loading) return <p>Betöltés...</p>;

  return (
      <div className="min-h-screen bg-canvas-50">
      <PageHeader
        title={workshop?.title || "Ismeretlen blueprint"}
        subtitle={workshop?.description || "Nincs leírás"}
      >
        {isPremium && (
          <span className="px-3 py-1 rounded-full bg-pastel-mint text-pastel-mintText text-xs font-semibold">
            Prémium
          </span>
        )}
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            {isPremiumLocked ? (
              <PremiumLockNotice isAuthenticated={!!user} workshopId={workshop?.documentId} />
            ) : (
              <>
                {hasSteps && <Steps steps={workshop.steps} />}
                {hasVideo && <Video video={workshop.video} />}
              </>
            )}
          </div>

          <div className="lg:col-span-4">
            {hasMaterials ? (
              <div className="sticky top-24">
                <MaterialRequirement materialRequirement={workshop.materialRequirement} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
