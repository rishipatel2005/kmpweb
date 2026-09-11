import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VisitHeader } from "@/components/visits/VisitHeader";
import { VisitHeroPhoto } from "@/components/visits/VisitHeroPhoto";
import { VisitInfoSections } from "@/components/visits/VisitInfoSections";
import { VisitMapLoader } from "@/components/visits/VisitMapLoader";
import { getVisitById } from "@/lib/visits";

type VisitPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: VisitPageProps): Promise<Metadata> {
  const { id } = await params;
  const visit = await getVisitById(id);

  if (!visit) {
    return { title: "Visit not found · Keshav Sales" };
  }

  return {
    title: `${visit.sale_done ? "Sale" : "No-sale"} visit · Keshav Sales`,
    description: `Visit by ${visit.users.full_name}`,
  };
}

export default async function VisitPage({ params }: VisitPageProps) {
  const { id } = await params;
  const visit = await getVisitById(id);

  if (!visit) {
    notFound();
  }

  return (
    <article className="flex flex-1 flex-col">
      <VisitHeroPhoto visitId={visit.id} />

      <div className="relative z-10 mx-auto w-full max-w-3xl -mt-16 px-5 pb-16 sm:-mt-20 sm:px-8 sm:pb-24">
        <div className="space-y-12 rounded-sm bg-[var(--page)]/95 px-5 py-8 backdrop-blur-sm sm:space-y-14 sm:px-8 sm:py-10">
          <VisitHeader
            saleDone={visit.sale_done}
            capturedAt={visit.captured_at}
          />
          <VisitInfoSections visit={visit} />
          <VisitMapLoader lat={visit.photo_lat} lng={visit.photo_lng} />
        </div>
      </div>
    </article>
  );
}
