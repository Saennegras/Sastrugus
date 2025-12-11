import type { Core } from '@strapi/strapi';



declare const strapi: Core.Strapi;

//quick hack: fields we need and Any for others :)
type WorkshopData = {
  documentId: string;
  id: number;
  isPremium?: boolean;
  owner?: { documentId: string; id: number };
  video?: string | null;
  materialRequirement?: string | null;
  steps?: string | null;
} & Record<string, any>;


export default {
    async afterFindOne(event) {
        const { result } = event;
        if (result) {
            await secureWorkshopData([result as WorkshopData]);
        }
    },

    async afterFindMany(event) {
        const { result } = event;
        if (result && Array.isArray(result)) {
            await secureWorkshopData(result as WorkshopData[]);
        }
    },
};

async function secureWorkshopData(workshops: WorkshopData[]) {
    const ctx = strapi.requestContext.get();
    const user = ctx?.state?.user as { documentId: string; id: number } | undefined;

    const protectedFields = ['video', 'materialRequirement', 'steps'] as (keyof WorkshopData)[];

    const premiumWorkshops = workshops.filter((w) => w.isPremium === true);

    if (premiumWorkshops.length === 0) return;

    // No user logged in remove protected fields
    if (!user) {
        premiumWorkshops.forEach((w) => scrubFields(w, protectedFields));
        return;
    }


    const workshopIds = premiumWorkshops.map((w) => w.documentId);

    const purchases = await strapi.documents('api::purchase.purchase').findMany({
        filters: {
            User: {
                documentId: {
                    $eq: user.documentId
                }
            },
            Workshop: {
                documentId: {
                    $in: workshopIds,
                },
            },
            success: true,
        },
        populate: ['Workshop'],
    });


    const purchasedWorkshopIds = new Set(
        (purchases as any[]).map((p) => p.Workshop?.documentId).filter(Boolean)
    );

    for (const workshop of premiumWorkshops) {
        const ownerData = workshop.owner as any; //TOCHECK
        const isOwner = ownerData && (ownerData.documentId === user.documentId || ownerData.id === user.id);

        if (isOwner) continue; //OWner can see anything
        if (purchasedWorkshopIds.has(workshop.documentId)) continue; //User has purchased the workshop

        scrubFields(workshop, protectedFields); //All other cases remove protected fields
    }
}

const scrubFields = (entity: WorkshopData, fields: (keyof WorkshopData)[]) => {
    fields.forEach((field) => {
        if (field in entity) {
            entity[field] = null;
        }
    });
}