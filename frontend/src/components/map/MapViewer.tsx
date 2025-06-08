"use client";

import { useEffect, useRef, useState } from "react";
import { fromLonLat, toLonLat } from "ol/proj";
import { useMapContext } from "@/context/MapContext";
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";
import { createBaseLayer } from "@/components/map/layers/BaseLayer";
import { createFrameLayer } from "@/components/map/layers/FrameLayer";
import PopupTool from "@/components/map/tools/PopupTool";
import ContextLayerSwitcher from "@/components/map/tools/ContextLayerSwitcher";
import ToolContainer from "@/components/map/tools/ToolContainer";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke } from "ol/style";
import { DrawTool } from "./tools/DrawTool";
import { getLocationDescription } from "@/lib/api";

export const MapViewer = () => {
  const [context, setContext] = useState<string>("Traffic"); // Example context state
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjectRef = useRef<Map | null>(null);
  const { setMap } = useMapContext();
  const layerRefs = useRef<{ [key: string]: VectorLayer<any> }>({});

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

      const roadLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({ stroke: new Stroke({ color: "red", width: 2 }) }),
        visible: false,
      });
      const buildingLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({ stroke: new Stroke({ color: "blue", width: 2 }) }),
        visible: false,
      });
      const landmarkLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({ stroke: new Stroke({ color: "green", width: 2 }) }),
        visible: false,
      });

      map.addLayer(roadLayer);
      map.addLayer(buildingLayer);
      map.addLayer(landmarkLayer);

      layerRefs.current["roads"] = roadLayer;
      layerRefs.current["buildings"] = buildingLayer;
      layerRefs.current["landmarks"] = landmarkLayer;

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

    if (geometry.getType() === "Point") {
      const coordinate = geometry.getCoordinates();
      const [lat, lon] = toLonLat(coordinate);
      const res = await getLocationDescription(lon, lat, context);
      console.log("Location description:", res);
    }
  };

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
        className="border overflow-hidden"
      />
      <ToolContainer>
        <ContextLayerSwitcher
          context={context}
          setContext={setContext}
          onChangeLayer={(layerId) => {
            Object.entries(layerRefs.current).forEach(([key, layer]) => {
              layer.setVisible(key === layerId);
            });
          }}
        />
        <DrawTool onDrawEnd={handleDrawEnd} />
        {/* <PopupTool /> */}
      </ToolContainer>
    </>
  );
};
