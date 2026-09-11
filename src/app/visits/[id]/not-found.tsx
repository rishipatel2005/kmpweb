import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-source-serif)] text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
        Visit not found
      </p>
      <p className="mt-3 max-w-md text-[var(--muted)]">
        This visit link may be incorrect or the record is no longer available.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-[var(--olive)] underline-offset-4 hover:underline"
      >
        Back to Keshav Sales
      </Link>
    </main>
  );
}
