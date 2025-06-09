import { Feature, Geometry } from "geojson";
import { center as turfCenter } from "@turf/turf";
import React, { useState, useEffect } from "react";

type MapPreviewProps = {
  geometry: Feature<Geometry>;
};

const getCenter = (geometry: Feature<Geometry>): [number, number] => {
  if (geometry.geometry.type === "Point") {
    const [lng, lat] = geometry.geometry.coordinates as [number, number];
    return [lat, lng];
  }
  const c = turfCenter(geometry);
  const [lng, lat] = c.geometry.coordinates as [number, number];
  return [lat, lng];
};

const MapPreview = ({ geometry }: MapPreviewProps) => {
  // Hydration-safe: only render on client
  const [MapComponent, setMapComponent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { MapContainer, TileLayer, GeoJSON } = require("react-leaflet");
    require("leaflet/dist/leaflet.css");

    const L = require("leaflet");
    const markerIcon2x = require("leaflet/dist/images/marker-icon-2x.png");
    const markerIcon = require("leaflet/dist/images/marker-icon.png");
    const markerShadow = require("leaflet/dist/images/marker-shadow.png");

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    const tileUrl = window.location.href.includes("dark")
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    const centerLatLng = getCenter(geometry);

    const setColor = ({ properties }: any) => {
      return {
        color: "blue",
        weight: 2,
        fillColor: "lightblue",
        fillOpacity: 0.5
      };
    };

    const pointToLayer = (_feature: any, latlng: any) => {
      return L.circleMarker(latlng, {
        radius: 6,
        fillColor: "red",
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    };

    setMapComponent(
      <MapContainer
        center={centerLatLng}
        zoom={18}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-100 rounded-lg shadow-md"
      >
        <TileLayer url={tileUrl} />
        <GeoJSON data={geometry} style={setColor} pointToLayer={pointToLayer} />
      </MapContainer>
    );
  }, [geometry]);

  // On server, or before client effect runs, render nothing
  if (typeof window === "undefined") return null;
  return MapComponent;
}

export default MapPreview;
