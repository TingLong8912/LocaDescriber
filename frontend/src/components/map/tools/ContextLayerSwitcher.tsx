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

interface ContextLayerSwitcherProps {
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
  onChangeLayer: (layerId: string) => void;
}

export default function ContextLayerSwitcher({ context, setContext, onChangeLayer }: ContextLayerSwitcherProps) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const initialIndex = vectorLayers.findIndex((layer) => layer.id === context);
    return initialIndex !== -1 ? initialIndex : 0;
  });
  const selectedIcon = vectorLayers[selectedIndex].icon;

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
