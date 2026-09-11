import { formatCapturedAt } from "@/lib/visit-format";

type VisitHeaderProps = {
  saleDone: boolean;
  capturedAt: Date;
};

export function VisitHeader({ saleDone, capturedAt }: VisitHeaderProps) {
  return (
    <header className="animate-[rise-in_0.6s_ease-out]">
      <p className="font-[family-name:var(--font-source-serif)] text-3xl tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
        Keshav Sales
      </p>
      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
          {saleDone ? "Sale visit" : "No-sale visit"}
        </h1>
        <time
          dateTime={capturedAt.toISOString()}
          className="text-sm text-[var(--muted)] sm:pb-0.5"
        >
          {formatCapturedAt(capturedAt)}
        </time>
      </div>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
        Field visit record shared for review.
      </p>
    </header>
  );
}
