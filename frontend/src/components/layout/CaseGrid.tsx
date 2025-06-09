import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import MapCard from "@/components/ui/MapCard";
const MapPreview = dynamic(() => import("./MapPreview"), { ssr: false });
import "leaflet/dist/leaflet.css";
import case1 from "@/data/geojson/case1.json";
import case2 from "@/data/geojson/case2.json";
import case3 from "@/data/geojson/case3.json";
import case4 from "@/data/geojson/case4.json";
import case5 from "@/data/geojson/case5.json";
import case6 from "@/data/geojson/case6.json";

const cases = [
  {
    id: 1,
    title: "Typhoon Case",
    featureId: "case1",
    geometry: case1.features[0].geometry,
  },
  {
    id: 2,
    title: "Earthquake",
    featureId: "case2",
    geometry: case2.features[0].geometry,
  },
  {
    id: 3,
    title: "Flood Line",
    featureId: "case3",
    geometry: case3.features[0].geometry,
  },
  {
    id: 4,
    title: "Evacuation Route",
    featureId: "case4",
    geometry: case4.features[0].geometry,
  },
  {
    id: 5,
    title: "Construction Zone",
    featureId: "case5",
    geometry: case5.features[0].geometry,
  },
  {
    id: 6,
    title: "Danger Area",
    featureId: "case6",
    geometry: case6.features[0].geometry,
  },
];

export default function CaseGrid() {
  const [activeCardId, setActiveCardId] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const index = cases.findIndex(c => c.id === activeCardId);
      containerRef.current.scrollTo({
        left: index * 300,
        behavior: "smooth",
      });
    }
  }, [activeCardId]);

  return (
    <div className="mx-auto">
      <div ref={containerRef} className="flex space-x-4 py-15 overflow-x-auto scrollbar-hide">
        {cases.map(({ id, title, featureId, geometry }) => (
          <Link key={id} href={`/map?featureId=${featureId}`}>
            <MapCard id={id} title={title} href={`/map?featureId=${featureId}`} geometry={geometry} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCardId(c.id)}
            className={`w-5 h-5 rounded-full ${activeCardId === c.id ? "bg-muted-foreground" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}