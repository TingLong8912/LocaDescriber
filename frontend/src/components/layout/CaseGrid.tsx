import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import MapCard from "@/components/ui/MapCard";
const MapPreview = dynamic(() => import("./MapPreview"), { ssr: false });
import "leaflet/dist/leaflet.css";
import case1 from "@/data/geojson/汐止交流道.json";
import case2 from "@/data/geojson/龍潭堵隧道.json";
import case3 from "@/data/geojson/和平東路.json";
import case4 from "@/data/geojson/民權西承德.json";
import case5 from "@/data/geojson/建高往北.json";
import case6 from "@/data/geojson/台北橋往台北.json";

const cases = [
  {
    id: 1,
    title: "Typhoon Case",
    img: "/cases/case1.jpg",
    href: "/demo/typhoon",
    geometry: case1.features[0].geometry,
  },
  {
    id: 2,
    title: "Earthquake",
    img: "/cases/case2.jpg",
    href: "/demo/earthquake",
    geometry: case2.features[0].geometry,
  },
  {
    id: 3,
    title: "Flood Line",
    img: "/cases/case3.jpg",
    href: "/demo/flood",
    geometry: case3.features[0].geometry,
  },
  {
    id: 4,
    title: "Evacuation Route",
    img: "/cases/case4.jpg",
    href: "/demo/evacuation",
    geometry: case4.features[0].geometry,
  },
  {
    id: 5,
    title: "Construction Zone",
    img: "/cases/case5.jpg",
    href: "/demo/construction",
    geometry: case5.features[0].geometry,
  },
  {
    id: 6,
    title: "Danger Area",
    img: "/cases/case6.jpg",
    href: "/demo/danger",
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
      <div ref={containerRef} className="flex space-x-4 py-10 overflow-x-auto scrollbar-hide">
        {cases.map(({ id, title, img, href, geometry }) => (
          <MapCard key={id} id={id} title={title} href={href} geometry={geometry} />
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