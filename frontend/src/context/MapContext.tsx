// src/context/MapContext.tsx
"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import Map from "ol/Map";

interface MapContextType {
  map: Map | null;
  setMap: (map: Map) => void;
  isDrawing: boolean;
  setIsDrawing: (val: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<Map | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <MapContext.Provider value={{ map, setMap, isDrawing, setIsDrawing }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};