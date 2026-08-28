import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "ORDERLY Studio — Creative Technology";
    const category = searchParams.get("category") || "ENGINEERING × DESIGN × GROWTH";
    const metric = searchParams.get("metric") || "EGP 1.8B+ (~$37M)";
    const metricLabel = searchParams.get("metricLabel") || "Client Platform Value";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#070709",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Top Row: Brand & Category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 900,
                  letterSpacing: "4px",
                  color: "#ffffff",
                }}
              >
                ORDERLY
              </span>
            </div>

            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: "30px",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#10B981",
                backgroundColor: "rgba(16,185,129,0.1)",
              }}
            >
              {category}
            </div>
          </div>

          {/* Center: Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "950px",
            }}
          >
            <h1
              style={{
                fontSize: "52px",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#ffffff",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom Row: Stats & Signature */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: "30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "36px", fontWeight: 900, color: "#10B981" }}>
                {metric}
              </span>
              <span style={{ fontSize: "14px", letterSpacing: "1px", color: "#94A3B8" }}>
                {metricLabel}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#94A3B8",
              }}
            >
              orderlyshops.com // STUDIO OS
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
