"use client";

import { useEffect, useRef } from "react";
import { fromLonLat } from "ol/proj";
import { useMapContext } from "@/context/MapContext";
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";
import { createBaseLayer } from "@/components/map/layers/BaseLayer";
import { createFrameLayer } from "@/components/map/layers/FrameLayer";
import PopupTool from "./tools/PopupTool";

export const MapViewer = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjectRef = useRef<Map | null>(null);
  const { setMap } = useMapContext();

  useEffect(() => {
    if (mapRef.current && !mapObjectRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [createBaseLayer()],
        view: new View({
          center: fromLonLat([121, 24]),
          zoom: 9,
          projection: "EPSG:3857",
        }),
      });

      const frameLayer = createFrameLayer(map);
      map.addLayer(frameLayer);

      mapObjectRef.current = map;
      setMap(map);
    }

    return () => {
      mapObjectRef.current?.setTarget(undefined);
      mapObjectRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
        className="border"
      />
      <PopupTool />
    </>
  );
};
