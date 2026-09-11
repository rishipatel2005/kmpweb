type DetailRowProps = {
  label: string;
  value: string;
};

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid gap-1 border-b border-[var(--line)] py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:items-baseline">
      <dt className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </dt>
      <dd className="text-base leading-relaxed text-[var(--ink)] sm:text-[1.05rem]">
        {value}
      </dd>
    </div>
  );
}
