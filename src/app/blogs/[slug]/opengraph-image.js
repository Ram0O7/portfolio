import { ImageResponse } from "next/og";
import { getBlog } from "@/sanity/lib/content";
export const size = { width: 1200, height: 630 };
export const alt = "Writing by Ramkrishn Rai";
export const contentType = "image/png";
export default async function Image({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px",
        width: "100%",
        height: "100%",
        background: "#f8f9f6",
        color: "#202723",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#496457" }}>
        RAMKRISHN RAI / THE NOTEBOOK
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 62,
          letterSpacing: "-2px",
          lineHeight: 1.12,
        }}
      >
        {blog?.title || "Notes on building for the web."}
      </div>
      <div style={{ display: "flex", fontSize: 24 }}>
        Web development. Programming. Staying curious.
      </div>
    </div>,
    size,
  );
}
