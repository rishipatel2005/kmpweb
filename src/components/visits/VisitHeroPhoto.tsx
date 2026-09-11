"use client";

import { useEffect, useState } from "react";

type VisitHeroPhotoProps = {
  visitId: string;
};

export function VisitHeroPhoto({ visitId }: VisitHeroPhotoProps) {
  const [failed, setFailed] = useState(false);
  const src = `/api/visits/${visitId}/photo`;

  useEffect(() => {
    setFailed(false);
  }, [visitId]);

  return (
    <div className="relative isolate min-h-[52vh] w-full overflow-hidden bg-[var(--stone-deep)] sm:min-h-[62vh]">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- proxied local API route; onError needs native img
        <img
          src={src}
          alt="Visit photo"
          className="absolute inset-0 h-full w-full object-cover animate-[fade-in_0.7s_ease-out]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_30%_20%,#3d4a3a_0%,#1c211c_55%,#121512_100%)]"
          role="img"
          aria-label="Visit photo unavailable"
        >
          <div className="px-6 text-center">
            <p className="font-[family-name:var(--font-source-serif)] text-2xl tracking-tight text-[var(--cream)]/90 sm:text-3xl">
              Photo unavailable
            </p>
            <p className="mt-2 text-sm text-[var(--cream)]/55">
              The visit image could not be loaded.
            </p>
          </div>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--page)] via-[var(--page)]/20 to-transparent"
        aria-hidden
      />
    </div>
  );
}
