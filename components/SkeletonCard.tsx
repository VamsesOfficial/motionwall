"use client";

export default function SkeletonCard() {
  return (
    <div>
      <div
        className="skeleton"
        style={{
          aspectRatio: "16/9",
          borderRadius: 20,
          width: "100%",
        }}
      />
      <div
        className="skeleton"
        style={{
          height: 14,
          borderRadius: 6,
          marginTop: 10,
          width: "60%",
        }}
      />
    </div>
  );
}
