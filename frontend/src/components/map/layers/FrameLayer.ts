import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke } from "ol/style";
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
    style: new Style({
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
    }),
  });

  if (source.getFeatures().length > 0) {
    const extent = source.getExtent();
    map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1500 });
  }

  return layer;
};