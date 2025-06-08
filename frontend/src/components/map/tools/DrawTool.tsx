"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Draw } from "ol/interaction";
import { createBox } from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { useMapContext } from "@/context/MapContext";
import { IconBtn } from "@/components/ui/IconBtn";
import { FileInput, MapPin, Pen, Spline, SquareMousePointer, SquareRoundCorner, X } from "lucide-react";
import * as Select from "@radix-ui/react-select";

// OpenLayers does not export GeometryType, so define it manually
type GeometryType = "Point" | "LineString" | "Polygon" | "Circle" | "Box" | "None";

const drawSource = new VectorSource();
const drawLayer = new VectorLayer({
  source: drawSource,
});

const geometryOptions = [
  { id: "Point", label: "Point", icon: <MapPin /> },
  { id: "LineString", label: "Line", icon: <Spline /> },
  { id: "Polygon", label: "Polygon", icon: <SquareRoundCorner /> },
  { id: "None", label: "Cancel", icon: <X /> },
];

export const DrawTool = ({ onDrawEnd }: { onDrawEnd?: (geometry: any) => void }) => {
  const { map } = useMapContext();
  const [drawType, setDrawType] = useState<GeometryType>("None");

  useEffect(() => {
    if (!map) return;

    if (!map.getLayers().getArray().includes(drawLayer)) {
      map.addLayer(drawLayer);
    }
    
    let draw: Draw | null = null;

    if (drawType !== "None") {
      drawSource.clear();
      draw = new Draw({
        source: drawSource,
        type: drawType === "Box" ? "Circle" : drawType, 
        geometryFunction: drawType === "Box" ? createBox() : undefined,
      });

      draw.on('drawend', (event) => {
        const geometry = event.feature.getGeometry();
        if (onDrawEnd) {
          onDrawEnd(geometry);
        }
      });

      map.addInteraction(draw);
    }

    return () => {
      if (draw) map.removeInteraction(draw);
    };
  }, [map, drawType, onDrawEnd]);

  const selected = geometryOptions.find((opt) => opt.id === drawType);

  const cycleDrawType = () => {
    const currentIndex = geometryOptions.findIndex((opt) => opt.id === drawType);
    const nextIndex = (currentIndex + 1) % geometryOptions.length;
    const nextType = geometryOptions[nextIndex].id as GeometryType;
    setDrawType(nextType);
  };

  return (
    <div className="w-fit h-full flex items-center space-x-2 text-foreground">
      <Select.Root>
        <Select.Trigger
          onClick={cycleDrawType}
          className="bg-primary-a text-primary-foreground w-12 h-12 flex items-center justify-center rounded-md"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={drawType}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {selected?.icon}
            </motion.span>
          </AnimatePresence>
        </Select.Trigger>
      </Select.Root>

      <IconBtn icon={<FileInput />} hoverIcon={<FileInput />} />
    </div>
  );
};