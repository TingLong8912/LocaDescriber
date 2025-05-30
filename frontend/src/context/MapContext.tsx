// src/context/MapContext.tsx
"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import Map from "ol/Map";

interface MapContextType {
  map: Map | null;
  setMap: (map: Map) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
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