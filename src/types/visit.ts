import type {
  storage_backend,
  user_role,
} from "@/app/generated/prisma/enums";

export type VisitDetail = {
  id: string;
  photo_url: string;
  photo_storage_backend: storage_backend;
  photo_lat: number;
  photo_lng: number;
  captured_at: Date;
  sale_done: boolean;
  packets: number | null;
  note: string | null;
  users: {
    id: string;
    full_name: string;
    territory_label: string | null;
    role: user_role;
  };
  customers: {
    id: string;
    name: string;
    phone: string;
  } | null;
  products: {
    id: string;
    name: string;
    name_hi: string | null;
  } | null;
  sale_types: {
    id: string;
    name: string;
    name_hi: string | null;
  } | null;
  no_sale_reasons: {
    id: string;
    name: string;
    name_hi: string | null;
  } | null;
};

export type VisitPhotoMeta = {
  photo_url: string;
  photo_storage_backend: storage_backend;
};
