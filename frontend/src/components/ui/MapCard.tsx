import React from "react";
import { motion } from "framer-motion";
import MapPreview from "@/components/layout/MapPreview";
import { Geometry } from "geojson";

type MapCardProps = {
  id: number;
  title: string;
  href: string;
  geometry: Geometry;
};

export default function MapCard({ id, title, href, geometry }: MapCardProps) {
  return (
    <motion.div
      key={id}
    whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
      className="w-100 h-80 flex-shrink-0 shadow-md rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <MapPreview geometry={{ type: "Feature", geometry, properties: {} }} />
      <div className="p-4 bg-white text-center font-semibold">{title}</div>
    </motion.div>
  );
}
