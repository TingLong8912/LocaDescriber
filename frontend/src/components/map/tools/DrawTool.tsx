"use client";

import { useEffect, useState } from "react";
import { Draw } from "ol/interaction";
import { createBox } from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { useMapContext } from "@/context/MapContext";
import { IconBtn } from "@/components/ui/IconBtn";
import { FileInput, MapPin, Spline, SquareMousePointer, SquareRoundCorner } from "lucide-react";

// OpenLayers does not export GeometryType, so define it manually
type GeometryType = "Point" | "LineString" | "Polygon" | "Circle" | "Box";

const drawSource = new VectorSource();
const drawLayer = new VectorLayer({
  source: drawSource,
});

export const DrawTool = () => {
  const { map } = useMapContext();
  const [drawType, setDrawType] = useState<GeometryType | "None">("None");

  useEffect(() => {
    if (!map) return;

    if (!map.getLayers().getArray().includes(drawLayer)) {
      map.addLayer(drawLayer);
    }

    let draw: Draw | null = null;

    if (drawType !== "None") {
      draw = new Draw({
        source: drawSource,
        type: drawType === "Box" ? "Circle" : drawType, // Box 要透過 geometryFunction 模擬
        geometryFunction: drawType === "Box" ? createBox() : undefined,
      });

      map.addInteraction(draw);
    }

    return () => {
      if (draw) map.removeInteraction(draw);
    };
  }, [map, drawType]);

  return (
    <div className="h-auto w-fit px-3 py-1 space-x-4 bg-card text-foreground border border-border rounded-md relative bottom-15 left-1/2 -translate-x-1/2">
      <IconBtn icon={<MapPin />} hoverIcon={<MapPin />} onClick={() => setDrawType("Point")}></IconBtn>
      <IconBtn icon={<Spline />} hoverIcon={<Spline />} onClick={() => setDrawType("LineString")}></IconBtn>
      <IconBtn icon={<SquareRoundCorner />} hoverIcon={<SquareRoundCorner />} onClick={() => setDrawType("Polygon")}></IconBtn>    
      <IconBtn icon={<FileInput />} hoverIcon={<FileInput />}></IconBtn>    
      {/* <button onClick={() => setDrawType("Box")}>矩形</button>
      <button onClick={() => setDrawType("None")}>清除繪製</button> */}
    </div>
  );
};