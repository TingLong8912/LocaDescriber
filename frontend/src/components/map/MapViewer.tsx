"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fromLonLat, toLonLat } from "ol/proj";
import { useMapContext } from "@/context/MapContext";
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";
import { createBaseLayer } from "@/components/map/layers/BaseLayer";
import { createFrameLayer } from "@/components/map/layers/FrameLayer";
import { getFrameExtent } from "@/components/map/layers/FrameLayer";
import PopupTool from "@/components/map/tools/PopupTool";
import ContextLayerSwitcher from "@/components/map/tools/ContextLayerSwitcher";
import ToolContainer from "@/components/map/tools/ToolContainer";
import VectorLayer from "ol/layer/Vector";
import { DrawTool } from "./tools/DrawTool";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import { createInputLayer } from "./layers/InputLayer";
import { defaults as defaultInteractions } from "ol/interaction";
import { useRunStreamingLocationDescription } from "@/hooks/useRunStreamingLocationDescription";

export const MapViewer = ({ featureId }: { featureId?: string }) => {
  const [geojson, setGeojson] = useState<JSON | null>(null);
  const [hovered, setHovered] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjectRef = useRef<Map | null>(null);
  const { setMap } = useMapContext();
  const layerRefs = useRef<{ [key: string]: VectorLayer<any> }>({});
  const { context } = useMapContext();

  useRunStreamingLocationDescription(geojson, context);
  
  useEffect(() => {
    if (!featureId) return;

    try {
      const geojson = require(`@/data/geojson/${featureId}.json`);
      console.log("MapViewer mounted with featureId:", featureId);
      console.log("GeoJSON data:", geojson);
      console.log("Current context:", context);
    } catch (error) {
      console.error(`Error loading GeoJSON for featureId "${featureId}":`, error);
    }
  }, [featureId, context]);

  useEffect(() => {
    if (mapRef.current && !mapObjectRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [createBaseLayer()],
        view: new View({
          center: fromLonLat([121, 24]),
          zoom: 9,
          projection: "EPSG:3857",
          extent: getFrameExtent(),
        }),
        interactions: defaultInteractions({
          dragPan: !featureId,
          mouseWheelZoom: !featureId,
          doubleClickZoom: !featureId,
          pinchZoom: !featureId,
        }),
      });

      // Layers
      // Frame Layer
      const frameLayer = createFrameLayer(map);
      map.addLayer(frameLayer);

      // Input Vector Layers
      if (featureId) {
        try {
          const inputLayer = createInputLayer(map, require(`@/data/geojson/${featureId}.json`));
          map.addLayer(inputLayer);
        }
        catch (error) {
          console.error(`Error loading input layer for featureId "${featureId}":`, error);
        }
      }

      mapObjectRef.current = map;
      setMap(map);
    }

    return () => {
      mapObjectRef.current?.setTarget(undefined);
      mapObjectRef.current = null;
    };
  }, []);

  const handleDrawEnd = async (geometry: any) => {
    console.log("Draw finished:", geometry);
    console.log("Context:", context);

    const geojsonObj = new GeoJSON().writeFeatureObject(new Feature({ geometry }));

    // Convert coordinates to EPSG:4326 for Point, LineString, Polygon
    const type = geometry.getType();
    if (type === "Point") {
      const [x, y] = geometry.getCoordinates();
      const [lon, lat] = toLonLat([x, y]);
      (geojsonObj.geometry as { coordinates: number[] }).coordinates = [lon, lat];
    } else if (type === "LineString") {
      (geojsonObj.geometry as { coordinates: number[][] }).coordinates = geometry.getCoordinates().map(([x, y]: number[]) =>
        toLonLat([x, y])
      );
    } else if (type === "Polygon") {
      (geojsonObj.geometry as { coordinates: number[][][] }).coordinates = geometry.getCoordinates().map((ring: number[][]) =>
        ring.map(([x, y]: number[]) => toLonLat([x, y]))
      );
    }

    // Wrap the single feature GeoJSON into a FeatureCollection before sending to the API.
    const featureCollection = {
      type: "FeatureCollection",
      features: [geojsonObj]
    };

    setGeojson(featureCollection as unknown as JSON);
  };

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
        className={`w-full h-full overflow-hidden ${featureId ? 'border-4 border-primary-a shadow-lg' : ''}`}
      />

      <ToolContainer>
        {featureId ? (
          <div className="flex items-center justify-between">
            <motion.a
              href="/map"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                key={hovered ? "exit" : "view"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="mr-2 px-4 py-2 rounded-md bg-primary-a text-primary-foreground"
              >
                {hovered ? "Exit Preview Mode" : "View Case Only"}
              </motion.span>
            </motion.a>
          </div>
        ) : (
          <>
            <ContextLayerSwitcher
              onChangeLayer={(layerId) => {
                Object.entries(layerRefs.current).forEach(([key, layer]) => {
                  layer.setVisible(key === layerId);
                });
              }}
            />
            <DrawTool onDrawEnd={handleDrawEnd} />
          </>
        )}
        <PopupTool />
      </ToolContainer>
    </>
  );
};
