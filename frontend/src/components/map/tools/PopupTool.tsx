"use client";

import { useEffect, useState } from "react";
import Overlay from "ol/Overlay";
import { toStringHDMS } from "ol/coordinate";
import { useMapContext } from "@/context/MapContext";

const PopupTool = () => {
  const { map } = useMapContext();
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [popupCoord, setPopupCoord] = useState<number[] | null>(null);

  useEffect(() => {
    if (!map) return;

    const container = document.getElementById("popup")!;
    const overlay = new Overlay({
      element: container,
      autoPan: true,
    });
    // Set autoPanAnimation after creation if needed
    (overlay as any).autoPanAnimation = { duration: 250 };

    map.addOverlay(overlay);

    const handleClick = (evt: any) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        const props = feature.getProperties();
        const content = Object.entries(props)
          .filter(([key]) => key !== "geometry")
          .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
          .join("");
        setPopupContent(`<table class="text-sm">${content}</table>`);
        setPopupCoord(evt.coordinate);
        overlay.setPosition(evt.coordinate);
      } else {
        overlay.setPosition(undefined);
        setPopupContent(null);
      }
    };

    map.on("singleclick", handleClick);
    return () => {
      map.un("singleclick", handleClick);
      map.removeOverlay(overlay);
    };
  }, [map]);

  return (
    <div
      id="popup"
      className="bg-white border border-gray-300 shadow-md rounded p-2 absolute z-10"
      style={{ position: "absolute", minWidth: "200px", pointerEvents: "auto" }}
      dangerouslySetInnerHTML={popupContent ? { __html: popupContent } : undefined}
    />
  );
};

export default PopupTool;