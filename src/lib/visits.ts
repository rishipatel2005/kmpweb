import "server-only";

import { Prisma } from "../app/generated/prisma/client";
import type { VisitDetail, VisitPhotoMeta } from "@/types/visit";
import prisma from "./prisma";

export type { VisitDetail, VisitPhotoMeta };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isVisitId(id: string): boolean {
  return UUID_RE.test(id);
}

const visitDetailSelect = {
  id: true,
  photo_url: true,
  photo_storage_backend: true,
  photo_lat: true,
  photo_lng: true,
  captured_at: true,
  sale_done: true,
  packets: true,
  note: true,
  users: {
    select: {
      id: true,
      full_name: true,
      territory_label: true,
      role: true,
    },
  },
  customers: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },
  products: {
    select: {
      id: true,
      name: true,
      name_hi: true,
    },
  },
  sale_types: {
    select: {
      id: true,
      name: true,
      name_hi: true,
    },
  },
  no_sale_reasons: {
    select: {
      id: true,
      name: true,
      name_hi: true,
    },
  },
} satisfies Prisma.visitsSelect;

/**
 * Load a public visit with related display fields.
 * Server-only — call from Server Components or Route Handlers.
 */
export async function getVisitById(id: string): Promise<VisitDetail | null> {
  if (!isVisitId(id)) return null;

  return prisma.visits.findUnique({
    where: { id },
    select: visitDetailSelect,
  });
}

/**
 * Load photo storage metadata for the image proxy.
 * Server-only — call from Route Handlers.
 */
export async function getVisitPhotoMeta(
  id: string,
): Promise<VisitPhotoMeta | null> {
  if (!isVisitId(id)) return null;

  return prisma.visits.findUnique({
    where: { id },
    select: {
      photo_url: true,
      photo_storage_backend: true,
    },
  });
}
