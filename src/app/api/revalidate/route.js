import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret)
    return Response.json(
      { error: "Webhook is not configured." },
      { status: 503 },
    );
  try {
    const { isValidSignature, body } = await parseBody(request, secret);
    if (!isValidSignature)
      return Response.json({ error: "Invalid signature." }, { status: 401 });
    if (
      !body ||
      !["blog", "post", "project", "author", "category"].includes(body._type)
    )
      return Response.json(
        { error: "Unsupported content type." },
        { status: 400 },
      );
    revalidateTag("sanity-content", { expire: 0 });
    revalidatePath("/");
    revalidatePath("/blogs");
    revalidatePath("/blogs/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return Response.json({ revalidated: true });
  } catch {
    return Response.json(
      { error: "Invalid webhook request." },
      { status: 400 },
    );
  }
}
