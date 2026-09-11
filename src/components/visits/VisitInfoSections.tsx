import {
  formatDisplayName,
  formatOptional,
  formatPackets,
  formatRole,
} from "@/lib/visit-format";
import type { VisitDetail } from "@/types/visit";
import { DetailRow } from "./DetailRow";

type VisitInfoSectionsProps = {
  visit: VisitDetail;
};

export function VisitInfoSections({ visit }: VisitInfoSectionsProps) {
  const salesmanValue = [
    visit.users.full_name,
    formatRole(visit.users.role),
    visit.users.territory_label,
  ]
    .filter((part): part is string => Boolean(part?.trim()))
    .join(" · ");

  const customerValue = visit.customers
    ? [visit.customers.name, visit.customers.phone]
        .filter((part) => part.trim())
        .join(" · ")
    : "—";

  return (
    <section
      className="animate-[rise-in_0.7s_ease-out]"
      aria-labelledby="visit-details-heading"
    >
      <h2
        id="visit-details-heading"
        className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--olive)]"
      >
        Visit details
      </h2>
      <dl className="mt-2">
        <DetailRow label="Salesman" value={salesmanValue} />
        <DetailRow label="Customer" value={customerValue} />

        {visit.sale_done ? (
          <>
            <DetailRow
              label="Product"
              value={
                visit.products
                  ? formatDisplayName(
                      visit.products.name,
                      visit.products.name_hi,
                    )
                  : "—"
              }
            />
            <DetailRow label="Packets" value={formatPackets(visit.packets)} />
            <DetailRow
              label="Sale type"
              value={
                visit.sale_types
                  ? formatDisplayName(
                      visit.sale_types.name,
                      visit.sale_types.name_hi,
                    )
                  : "—"
              }
            />
          </>
        ) : (
          <DetailRow
            label="No-sale reason"
            value={
              visit.no_sale_reasons
                ? formatDisplayName(
                    visit.no_sale_reasons.name,
                    visit.no_sale_reasons.name_hi,
                  )
                : "—"
            }
          />
        )}

        <DetailRow label="Note" value={formatOptional(visit.note)} />
      </dl>
    </section>
  );
}
