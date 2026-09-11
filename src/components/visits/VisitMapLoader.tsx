"use client";

import dynamic from "next/dynamic";

const VisitMap = dynamic(
  () =>
    import("./VisitMap").then((mod) => ({
      default: mod.VisitMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-64 w-full animate-pulse rounded-sm bg-[var(--stone)] sm:h-80"
        aria-hidden
      />
    ),
  },
);

type VisitMapLoaderProps = {
  lat: number;
  lng: number;
};

export function VisitMapLoader({ lat, lng }: VisitMapLoaderProps) {
  return <VisitMap lat={lat} lng={lng} />;
}
