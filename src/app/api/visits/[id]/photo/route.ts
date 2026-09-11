import { downloadBlob } from "@/lib/azure-blob";
import { getVisitPhotoMeta } from "@/lib/visits";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { id } = await context.params;
  const meta = await getVisitPhotoMeta(id);

  if (!meta || meta.photo_storage_backend !== "azure_blob") {
    return new Response(null, { status: 404 });
  }

  const blob = await downloadBlob(meta.photo_url);
  if (!blob) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(blob.body), {
    status: 200,
    headers: {
      "Content-Type": blob.contentType,
      "Cache-Control": "private, max-age=300",
      "Content-Length": String(blob.body.byteLength),
    },
  });
}
