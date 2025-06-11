import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

export const createBaseLayer = () => {
  let isDark = false;
  if (typeof window !== "undefined") {
    isDark = localStorage.getItem("theme") === "dark";
  }
  let url = isDark
    ? "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const layer = new TileLayer({
    source: new XYZ({
      url,
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    }),
  });

  if (typeof window !== "undefined") {
    const updateLayer = () => {
      const isDark = localStorage.getItem("theme") === "dark";
      const newUrl = isDark
        ? "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      (layer.getSource() as XYZ).setUrl(newUrl);
    };
    window.addEventListener("storage", updateLayer);
    // 可選：返回一個移除監聽的函式
    // return () => window.removeEventListener("storage", updateLayer);
  }

  return layer;
};