"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatCoordinates } from "@/lib/visit-format";

type VisitMapProps = {
  lat: number;
  lng: number;
};

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function VisitMap({ lat, lng }: VisitMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([lat, lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.marker([lat, lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(formatCoordinates(lat, lng));

    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

  return (
    <section
      className="animate-[rise-in_0.8s_ease-out]"
      aria-labelledby="visit-location-heading"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2
          id="visit-location-heading"
          className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--olive)]"
        >
          Location
        </h2>
        <p className="font-mono text-xs text-[var(--muted)]">
          {formatCoordinates(lat, lng)}
        </p>
      </div>
      <div
        ref={containerRef}
        className="h-64 w-full overflow-hidden rounded-sm border border-[var(--line)] sm:h-80"
        role="presentation"
      />
    </section>
  );
}
