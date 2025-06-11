"use client";

import { useEffect, useState } from "react";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { motion, AnimatePresence } from "framer-motion";
import { Draw } from "ol/interaction";
import { createBox } from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { useMapContext } from "@/context/MapContext";
import { FileUp, MapPin, Parentheses, Spline, SquareRoundCorner, X } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { TooltipDemo } from "@/components/ui/Tooltips";
import { useProgress } from "@/context/ProgressContext";
import { ControllModal } from "@/components/ui/ControllModal";

// OpenLayers does not export GeometryType, so define it manually
type GeometryType = "Point" | "LineString" | "Polygon" | "Circle" | "Box" | "Text" | "GeoJSON" | "None";

const drawSource = new VectorSource();
const drawLayer = new VectorLayer({
  source: drawSource,
});

const geometryOptions = [
  { id: "Point", label: "Point", icon: <MapPin /> },
  { id: "LineString", label: "Line", icon: <Spline /> },
  { id: "Polygon", label: "Polygon", icon: <SquareRoundCorner /> },
  { id: "Text", label: "Text", icon: <Parentheses /> },
  { id: "GeoJSON", label: "GeoJSON", icon: <FileUp /> },
  { id: "None", label: "Cancel", icon: <X /> },
];

export const DrawTool = ({ onDrawEnd }: { onDrawEnd?: (geometry: any) => void }) => {
  const { map, setIsDrawing } = useMapContext();
  const { steps, progressStatus } = useProgress();
  const templateStep = steps.find((s) => s.label === "Template generation");
  const templateData = templateStep?.details ? JSON.parse(templateStep.details) : null;
  const [pendingFeature, setPendingFeature] = useState<any | null>(null);
  const [drawType, setDrawType] = useState<GeometryType>("None");

  const [showTextModal, setShowTextModal] = useState(false);
  const [showGeoJSONModal, setShowGeoJSONModal] = useState(false);

  const isCustomType = (type: GeometryType) => type === "Text" || type === "GeoJSON";

  useEffect(() => {
    if (!map) return;

    if (!map.getLayers().getArray().includes(drawLayer)) {
      map.addLayer(drawLayer);
    }

    let draw: Draw | null = null;

    if (drawType !== "None" && !isCustomType(drawType)) {
      draw = new Draw({
        source: drawSource,
        type: drawType === "Box" ? "Circle" : drawType,
        geometryFunction: drawType === "Box" ? createBox() : undefined,
      });

      draw.on('drawend', (event) => {
        drawSource.clear();
        setPendingFeature(null);
        const geometry = event.feature.getGeometry();
        setPendingFeature(event.feature);
        if (onDrawEnd) {
          onDrawEnd(geometry);
        }

        if (draw) {
          map.removeInteraction(draw);
          setDrawType("None");
          setIsDrawing(false);
        }
      });

      map.addInteraction(draw);
    }

    if (drawType !== "None") {
      setIsDrawing(true);
    }
    if (drawType === "Text") {
      setShowTextModal(true);
    }
    if (drawType === "GeoJSON") {
      setShowGeoJSONModal(true);
    }

    return () => {
      if (draw) map.removeInteraction(draw);
      setIsDrawing(false);
    };
  }, [map, drawType, steps, onDrawEnd, setIsDrawing]);

  useEffect(() => {
    if (pendingFeature && templateData) {
      pendingFeature.setProperties({ "LocationDescription": templateData[0] });
      setPendingFeature(null);
    }
  }, [pendingFeature, templateData]);

  const selected = geometryOptions.find((opt) => opt.id === drawType);

  const cycleDrawType = () => {
    const currentIndex = geometryOptions.findIndex((opt) => opt.id === drawType);
    let nextIndex = (currentIndex + 1) % geometryOptions.length;
    let nextType = geometryOptions[nextIndex].id as GeometryType;
    setDrawType(nextType);
    setShowTextModal(false);
    setShowGeoJSONModal(false);
  };

  return (
    <div className="w-fit h-full flex items-center space-x-2 text-foreground">
      <Select.Root>
        <Select.Trigger
          onClick={cycleDrawType}
          disabled={progressStatus === "running"}
          className={`bg-primary-a text-primary-foreground w-12 h-12 flex items-center justify-center rounded-md 
            ${progressStatus === "running" ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <AnimatePresence mode="wait">
            <TooltipDemo tooltip={selected ? selected.label : "Select Draw Type"}>
              <motion.span
                key={drawType}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {selected?.icon}
              </motion.span>
            </TooltipDemo>
          </AnimatePresence>
        </Select.Trigger>
      </Select.Root>
      {showTextModal && (
        <ControllModal
          open={showTextModal}
          onClose={() => setShowTextModal(false)}
          title="Enter Coordinates (lon, lat)"
        >
          <input
            type="text"
            className="w-full mb-2 px-2 py-1 border rounded"
            placeholder="e.g. 121.5, 25.05"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const [lon, lat] = (e.currentTarget.value || "").split(",").map(Number);
                if (!isNaN(lon) && !isNaN(lat)) {
                  const feature = new Feature({
                    geometry: new Point(fromLonLat([lon, lat])),
                  });
                  drawSource.clear();
                  drawSource.addFeature(feature);
                  setPendingFeature(feature);
                  setDrawType("None");
                  setShowTextModal(false);
                  if (onDrawEnd) {
                    onDrawEnd(feature.getGeometry());
                  }
                }
              }
            }}
          />
        </ControllModal>
      )}
      {showGeoJSONModal && (
        <ControllModal
          open={showGeoJSONModal}
          onClose={() => setShowGeoJSONModal(false)}
          title="Upload GeoJSON"
        >
          <input
            type="file"
            accept=".geojson,application/geo+json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const geojson = JSON.parse(reader.result as string);
                    const format = new GeoJSON();
                    const features = format.readFeatures(geojson, {
                      featureProjection: "EPSG:3857",
                    });
                    drawSource.clear();
                    drawSource.addFeatures(features);
                    if (features.length > 0) setPendingFeature(features[0]);
                    setDrawType("None");
                    setShowGeoJSONModal(false);
                    if (onDrawEnd) {
                      onDrawEnd(features[0].getGeometry());
                    }
                  } catch (err) {
                    alert("Invalid GeoJSON");
                  }
                };
                reader.readAsText(file);
              }
            }}
          />
        </ControllModal>
      )}
    </div>
  );
};