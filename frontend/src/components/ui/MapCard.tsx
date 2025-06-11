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
      className="w-100 h-80 flex-shrink-0 shadow-xl/10 rounded-md overflow-hidden hover:shadow-xl/10 transition-shadow duration-300 cursor-pointer relative group"
    >
      <div className="absolute z-10 inset-0 bg-muted/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5">
        <span className="text-muted-foreground text-lg font-semibold">{title}</span>
      </div>
      <MapPreview geometry={{ type: "Feature", geometry, properties: {} }} />
    </motion.div>
  );
}
