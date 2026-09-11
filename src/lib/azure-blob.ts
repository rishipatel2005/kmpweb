import "server-only";

import { BlobServiceClient } from "@azure/storage-blob";

export type BlobDownload = {
  body: Buffer;
  contentType: string;
};

const UNSAFE_KEY = /(\.\.|\\|^\/|https?:)/i;

/**
 * Validate storage keys stored in visits.photo_url.
 * Expected shape: visits/{userId}/{visitId}.jpg (or similar relative blob paths).
 */
export function isSafeBlobKey(key: string): boolean {
  const trimmed = key.trim();
  if (!trimmed || trimmed.length > 512) return false;
  if (UNSAFE_KEY.test(trimmed)) return false;
  if (!trimmed.startsWith("visits/")) return false;
  return true;
}

function getAzureConfig(): { connectionString: string; container: string } | null {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING?.trim();
  const container = process.env.AZURE_STORAGE_CONTAINER?.trim();
  if (!connectionString || !container) return null;
  return { connectionString, container };
}

/**
 * Download a blob by key. Returns null on missing config, unsafe key, or any Azure error.
 * Server-only — never import from Client Components.
 */
export async function downloadBlob(key: string): Promise<BlobDownload | null> {
  if (!isSafeBlobKey(key)) return null;

  const config = getAzureConfig();
  if (!config) return null;

  try {
    const client = BlobServiceClient.fromConnectionString(config.connectionString);
    const container = client.getContainerClient(config.container);
    const blob = container.getBlobClient(key);

    const exists = await blob.exists();
    if (!exists) return null;

    const download = await blob.download(0);
    if (!download.readableStreamBody) return null;

    const chunks: Buffer[] = [];
    for await (const chunk of download.readableStreamBody) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    return {
      body: Buffer.concat(chunks),
      contentType: download.contentType ?? "image/jpeg",
    };
  } catch {
    return null;
  }
}
