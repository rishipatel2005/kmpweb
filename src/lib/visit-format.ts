import type { user_role } from "@/app/generated/prisma/enums";

export function formatCapturedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

export function formatRole(role: user_role): string {
  const labels: Record<user_role, string> = {
    salesman: "Salesman",
    manager: "Manager",
    asm: "ASM",
    superadmin: "Superadmin",
  };
  return labels[role];
}

export function formatDisplayName(
  name: string,
  nameHi: string | null | undefined,
): string {
  if (nameHi && nameHi.trim() && nameHi !== name) {
    return `${name} (${nameHi})`;
  }
  return name;
}

export function formatPackets(packets: number | null): string {
  if (packets === null) return "—";
  return String(packets);
}

export function formatOptional(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "—";
}
