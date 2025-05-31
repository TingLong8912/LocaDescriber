import { useState, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { Car, CloudRainWind, Dam, SquareActivity, Waves } from "lucide-react";

// Vector layers available for switching
const vectorLayers = [
  { id: "Traffic", icon: <Car />, label: "Traffic" },
  { id: "ReservoirDis", icon: <Dam />, label: "ReservoirDis" },
  { id: "Thunderstorm", icon: <CloudRainWind />, label: "Thunderstorm" },
  { id: "EarthquakeEW", icon: <SquareActivity />, label: "EarthquakeEW" },
  { id: "Tsunami", icon: <Waves />, label: "Tsunami" },
];

export default function ContextLayerSwitcher({ onChangeLayer }: { onChangeLayer: (layerId: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedIcon = vectorLayers[selectedIndex].icon;

  const cycleLayer = () => {
    const nextIndex = (selectedIndex + 1) % vectorLayers.length;
    setSelectedIndex(nextIndex);
    onChangeLayer(vectorLayers[nextIndex].id);
  };

  return (
    <Select.Root>
      <Select.Trigger
        onClick={cycleLayer}
        className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center rounded-md"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {selectedIcon}
          </motion.span>
        </AnimatePresence>
      </Select.Trigger>
    </Select.Root>
  );
}
