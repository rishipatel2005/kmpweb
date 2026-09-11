export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col justify-end overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#dfe4d8_0%,transparent_55%),linear-gradient(160deg,#2a312a_0%,#1c211c_48%,#3f5a3c_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl animate-[rise-in_0.7s_ease-out]">
        <p className="font-[family-name:var(--font-source-serif)] text-5xl leading-none tracking-tight text-[var(--cream)] sm:text-6xl md:text-7xl">
          Keshav Sales
        </p>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--cream)]/75 sm:text-lg">
          Field visit records are shared through a private link. Open a visit
          URL to view photo, details, and location.
        </p>
      </div>
    </main>
  );
}
