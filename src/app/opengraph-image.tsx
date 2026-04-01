import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ryan Kumar — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#101010",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "#F7F7F7",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>RYAN</span>
          <span>KUMAR</span>
        </div>
        <div
          style={{
            width: 64,
            height: 1,
            backgroundColor: "rgba(247,247,247,0.3)",
            marginTop: 32,
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: "rgba(247,247,247,0.5)",
            marginTop: 24,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            fontFamily: "sans-serif",
          }}
        >
          Software Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
