import React from "react";

type StarRatingProps = {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
};

export default function StarRating({ value, onChange, readOnly }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: "flex", gap: 6 }}>
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => {
            if (readOnly) return;
            onChange?.(s);
          }}
          aria-label={`Rate ${s}`}
          style={{
            background: "transparent",
            border: "none",
            cursor: readOnly ? "default" : "pointer",
            fontSize: 20,
            color: s <= value ? "#f5c518" : "#ccc",
            padding: 4,
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
