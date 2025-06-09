import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";
import { Map } from "ol";


export const createInputLayer = (map: Map, geojson: any) => {
  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geojson, {
      featureProjection: "EPSG:3857",
    }),
  });

  const layer = new VectorLayer({
    source,
    style: (feature) => {
      const geometryType = feature.getGeometry()?.getType();
      switch (geometryType) {
        case 'Polygon':
        case 'MultiPolygon':
          return new Style({
            stroke: new Stroke({
              color: "rgb(25,97,251)",
              width: 2,
            }),
            fill: new Fill({
              color: "rgba(25,97,251,0.2)",
            }),
          });
        case 'LineString':
        case 'MultiLineString':
          return new Style({
            stroke: new Stroke({
              color: "rgb(25,97,251)",
              width: 2,
            }),
          });
        case 'Point':
        case 'MultiPoint':
          return new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({ color: "rgb(25,97,251)" }),
              stroke: new Stroke({ color: "#fff", width: 1 }),
            }),
          });
        default:
          return undefined;
      }
    },
  });

  if (source.getFeatures().length > 0) {
    const extent = source.getExtent();
    const buffer = 500;
    extent[0] -= buffer;
    extent[1] -= buffer;
    extent[2] += buffer;
    extent[3] += buffer;
    map.getView().fit(extent, { padding: [500, 500, 500, 500], duration: 0 });
  }

  return layer;
};