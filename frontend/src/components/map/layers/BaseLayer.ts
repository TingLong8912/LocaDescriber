import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

export const createBaseLayer = () => {
  const isDark =
    typeof window !== "undefined" && window.location.href.includes("dark");
  const url = isDark
    ? "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return new TileLayer({
    source: new XYZ({
      url,
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    }),
  });
};