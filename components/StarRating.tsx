"use client";
import React from "react";

export default function StarRating({ value, onChange, readOnly }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {stars.map((s) => (
        <button
          key={s}
          onClick={() => !readOnly && onChange?.(s)}
          style={{
            cursor: readOnly ? "default" : "pointer",
            border: "none",
            background: "transparent",
            fontSize: 32,
            color: s <= value ? "#ffd700" : "#555"
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
