import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = "Clinwide — система для стоматології";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "70px 80px",
        background: "#faf9f6",
        color: "#244835",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 42, letterSpacing: -2 }}>
        {BRAND.wordmark}
        <span style={{ color: "#ac6749" }}>.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            fontSize: 87,
            fontWeight: 700,
            letterSpacing: -5,
          }}
        >
          Your clinic. In sync.
        </div>
        <div style={{ display: "flex", fontSize: 29, color: "#6a8061" }}>
          Patients. Scheduling. Treatment. Finances.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: "#71836a",
        }}
      >
        <span>Dental practice workspace</span>
        <span style={{ display: "flex", color: "#244835" }}>CLINWIDE</span>
      </div>
    </div>,
    size,
  );
}
