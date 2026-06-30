"use client";
import React, { useState, useEffect } from "react";
import StarRating from "../components/StarRating";

export default function Page() {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(null);
  const [count, setCount] = useState(0);

  const resourceType = "restaurant";
  const resourceId = "123";

  useEffect(() => {
    fetch(`/api/ratings/${resourceType}/${resourceId}`)
      .then((r) => r.json())
      .then((data) => {
        setAverage(data.average);
        setCount(data.count);
        if (data.average) setRating(Math.round(data.average));
      });
  }, []);

  function submitRating(v) {
    setRating(v);
    fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resourceType, resourceId, score: v })
    })
      .then(() => fetch(`/api/ratings/${resourceType}/${resourceId}`))
      .then((r) => r.json())
      .then((data) => {
        setAverage(data.average);
        setCount(data.count);
      });
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Star Rating Test</h2>
      <StarRating value={rating} onChange={submitRating} readOnly={false} />
      <p style={{ marginTop: 20 }}>Current rating: {rating}</p>
      <p>Average: {average ?? "—"} ({count} votes)</p>
    </div>
  );
}
