import { ImageResponse } from "next/og";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#315c45",
        color: "#eaf0e1",
        fontSize: 350,
        fontWeight: 700,
        borderRadius: 110,
      }}
    >
      C
      <span
        style={{
          display: "flex",
          position: "absolute",
          top: 74,
          right: 77,
          fontSize: 100,
        }}
      >
        +
      </span>
    </div>,
    size,
  );
}
