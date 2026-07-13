import { ImageResponse } from "next/og";
import { fetchVerso } from "@/fetch/versoFetch";

// export const runtime = "edge"; // Optional, standard node works too
export const alt = "Verso Dynamic Poll Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const verso = await fetchVerso(Number(id));

  if (!verso) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#0f172a",
            color: "white",
            fontSize: "48px",
          }}
        >
          <h1>Verso Not Found</h1>
        </div>
      ),
      { ...size }
    );
  }

  // Extract items
  const itemA = verso.versoItems?.[0];
  const itemB = verso.versoItems?.[1];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "row",
          position: "relative",
          fontFamily: "sans-serif",
          backgroundColor: "#0f172a", // Fallback background
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e1b4b", // Deep Indigo
          }}
        >
          {itemA?.image ? (
            <img
              src={itemA.image}
              width={320}
              height={320}
              style={{
                objectFit: "cover",
                borderRadius: "24px",
                border: "4px solid rgba(255,255,255,0.1)",
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              color: "white",
              fontWeight: "900",
              marginTop: "40px",
            }}
          >
            {itemA?.count || 0}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#a5b4fc",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "4px",
              marginTop: "8px",
            }}
          >
            Votes
          </div>
        </div>

        {/* Right Panel */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4c0519", // Deep Rose
          }}
        >
          {itemB?.image ? (
            <img
              src={itemB.image}
              width={320}
              height={320}
              style={{
                objectFit: "cover",
                borderRadius: "24px",
                border: "4px solid rgba(255,255,255,0.1)",
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              color: "white",
              fontWeight: "900",
              marginTop: "40px",
            }}
          >
            {itemB?.count || 0}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#fda4af",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "4px",
              marginTop: "8px",
            }}
          >
            Votes
          </div>
        </div>

        {/* Title Overlay Gradient (Top) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              margin: 0,
              display: "flex",
            }}
          >
            {verso.title}
          </div>
        </div>

        {/* Center VS Badge */}
        <div
          style={{
            position: "absolute",
            top: "255px", // (630 / 2) - 60
            left: "540px", // (1200 / 2) - 60
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            borderRadius: "60px",
            backgroundColor: "#0f172a",
            border: "8px solid white",
            color: "white",
            fontSize: "48px",
            fontWeight: "900",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          VS
        </div>
      </div>
    ),
    { ...size }
  );
}
