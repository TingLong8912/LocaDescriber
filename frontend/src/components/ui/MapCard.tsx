import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MapPreview from "@/components/layout/MapPreview";
import { Geometry } from "geojson";

type MapCardProps = {
  id: number;
  title: string;
  geometry: Geometry;
};

export default function MapCard({ id, title, geometry }: MapCardProps) {
  return (
    <motion.div
      key={id}
      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
      className="w-100 h-80 flex-shrink-0 shadow-md rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <MapPreview geometry={{ type: "Feature", geometry, properties: {} }} />
    </motion.div>
  );
}
