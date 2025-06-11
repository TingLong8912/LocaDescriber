import { useState, ReactElement, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { Car, CloudRainWind, Dam, SquareActivity, Waves } from "lucide-react";
import { TooltipDemo } from "@/components/ui/Tooltips";
import { useProgress } from "@/context/ProgressContext";
import { useMapContext } from "@/context/MapContext";

// Vector layers available for switching
const vectorLayers = [
  { id: "Traffic", icon: <Car />, label: "Traffic" },
  { id: "ReservoirDis", icon: <Dam />, label: "ReservoirDis" },
  { id: "Thunderstorm", icon: <CloudRainWind />, label: "Thunderstorm" },
  { id: "EarthquakeEW", icon: <SquareActivity />, label: "EarthquakeEW" },
  { id: "Tsunami", icon: <Waves />, label: "Tsunami" },
];

interface ContextLayerSwitcherProps {
  onChangeLayer: (layerId: string) => void;
}

export default function ContextLayerSwitcher({ onChangeLayer }: { onChangeLayer: (layerId: string) => void }) {
  const { context, setContext } = useMapContext();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const initialIndex = vectorLayers.findIndex((layer) => layer.id === context);
    return initialIndex !== -1 ? initialIndex : 0;
  });
  const selectedIcon = vectorLayers[selectedIndex].icon;
  const { progressStatus } = useProgress();

  const cycleLayer = () => {
    const nextIndex = (selectedIndex + 1) % vectorLayers.length;
    setSelectedIndex(nextIndex);
    const nextContext = vectorLayers[nextIndex].id;
    setContext(nextContext);
    onChangeLayer(nextContext);
  };

  return (
    <Select.Root>
      <Select.Trigger
        onClick={cycleLayer}
        disabled={progressStatus === "running"}
        className={`bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center rounded-md ${progressStatus === "running" ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <AnimatePresence mode="wait">
          <TooltipDemo tooltip={vectorLayers[selectedIndex].label}>
            <motion.span
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {selectedIcon}
            </motion.span>
          </TooltipDemo>
        </AnimatePresence>
      </Select.Trigger>
    </Select.Root>
  );
}
