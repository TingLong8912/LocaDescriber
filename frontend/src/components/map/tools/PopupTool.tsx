"use client";

import { useEffect, useRef, useState } from "react";
import Overlay from "ol/Overlay";
import { toStringHDMS } from "ol/coordinate";
import { useMapContext } from "@/context/MapContext";

const PopupTool = () => {
  const { map, isDrawing } = useMapContext();
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [popupCoord, setPopupCoord] = useState<number[] | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map) return;
    if (!popupRef.current) return;

    const overlay = new Overlay({
      element: popupRef.current,
      autoPan: true,
    });
    // Set autoPanAnimation after creation if needed
    (overlay as any).autoPanAnimation = { duration: 250 };

    map.addOverlay(overlay);

    const handleClick = (evt: any) => {
      if (isDrawing) return;
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        const props = feature.getProperties();
        setPopupContent(props.LocationDescription);
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
  }, [map, isDrawing]);

  return (
    <div
      ref={popupRef}
      id="popup"
      className="bg-card border border-border shadow-xl/10 rounded-md p-5 absolute z-10 text-md w-100 max-w-100"
      style={{ position: "absolute", minWidth: "200px", pointerEvents: "auto" }}
      dangerouslySetInnerHTML={popupContent ? { __html: popupContent } : undefined}
    />
  );
};

export default PopupTool;