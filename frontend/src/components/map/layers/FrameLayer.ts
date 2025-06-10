import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Text, Fill } from "ol/style";
import { Map } from "ol";

import frameData from "@/data/geojson/frame.json";

export const createFrameLayer = (map: Map) => {
  const source = new VectorSource({
    features: new GeoJSON().readFeatures(frameData, {
      featureProjection: "EPSG:3857",
    }),
  });

  const layer = new VectorLayer({
    source,
    style: (feature) =>
      new Style({
        stroke: new Stroke({
          color: "rgba(22,22,22,0.2)",
          width: 2,
        }),
        text: new Text({
          text: "Study Area",
          font: "20px Calibri,sans-serif",
          fill: new Fill({ color: "rgba(22,22,22,0.2)" }),
          offsetY: -15,
        }),
      }),
  });

  if (source.getFeatures().length > 0) {
    const extent = source.getExtent();
    map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 0 });
  }

  return layer;
};

export const getFrameExtent = (): [number, number, number, number] => {
  const features = new GeoJSON().readFeatures(frameData, {
    featureProjection: "EPSG:3857",
  });
  const source = new VectorSource({ features });
  const extent = source.getExtent();
  const buffer = 30000;
  extent[0] -= buffer;
  extent[1] -= buffer;
  extent[2] += buffer;
  extent[3] += buffer;
  // Ensure extent is always a 4-element array
  if (extent.length === 4) {
    return extent as [number, number, number, number];
  } else {
    // Return a default extent if not available
    return [0, 0, 0, 0];
  }
};