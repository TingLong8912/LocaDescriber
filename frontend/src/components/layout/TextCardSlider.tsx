import React, { useState, useRef, useEffect } from "react";
import { Car, Dam, CloudRainWind, SquareActivity, Waves, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TooltipDemo } from "../ui/Tooltips";
import { useMapContext } from "@/context/MapContext";

const textCards = [
  {
    id: 1,
    title: "Traffic",
    context: "Traffic",
    content: "Due to road collapse and other factors, warning should be given to the road users within the information of road.",
    gradient: "bg-card",
    icon: <Car size={36} className="text-foreground mb-2" />,
  },
  {
    id: 2,
    title: "Reservoir Discharge",
    context: "ReservoirDis",
    content: "The reservoir begins to conduct regulatory discharge, flood discharge or free overflow.",
    gradient: "bg-card",
    icon: <Dam size={36} className="text-foreground mb-2" />,
  },
  {
    id: 3,
    title: "Torrential Rain",
    context: "Thunderstorm",
    content: "The Instant Torrential Rain Alert release method is a thunderstorm event accompanied by lightning convection.",
    gradient: "bg-card",
    icon: <CloudRainWind size={36} className="text-foreground mb-2" />,
  },
  {
    id: 4,
    title: "Earthquake",
    context: "EarthquakeEW",
    content: "The earthquake alert is released when the earthquake magnitude scale is detected greater than some values.",
    gradient: "bg-card",
    icon: <SquareActivity size={36} className="text-foreground mb-2" />,
  },
  {
    id: 5,
    title: "Tsunami",
    context: "Tsunami",
    content: "When the Central Weather Administration issues or lifts a tsunami warning in Taiwan, it is aimed for the coastal residents in Taiwan, Penghu, Kinmen and Matsu.",
    gradient: "bg-card",
    icon: <Waves size={36} className="text-foreground mb-2" />,
  },
];


export default function TextCardSlider() {
  const { setContext } = useMapContext();
  const [activeCardId, setActiveCardId] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const index = textCards.findIndex(c => c.id === activeCardId);
      containerRef.current.scrollTo({
        left: index * 340,
        behavior: "smooth",
      });
    }
  }, [activeCardId]);

  return (
    <div className="w-full py-12 bg-secondary">
      <h2 className="text-3xl md:text-4xl font-bold text-left p-10 tracking-tight">Explore Scenarios</h2>
      <div ref={containerRef} className="flex space-x-8 py-15 px-10 overflow-x-auto scrollbar-hide">
        {textCards.map(({ id, title, content, context, gradient, icon }) => (
          <div
            key={id}
            className={`w-90 h-60 px-5 py-8 flex-shrink-0 shadow-lg/10 rounded-md overflow-hidden hover:shadow-2xl/10 transition-shadow duration-300 cursor-pointer relative group ${gradient} ${activeCardId === id ? "scale-105 ring-4 ring-yellow-400/70" : "scale-100 opacity-80"
              }`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveCardId(id)}
          >
            <div className="flex flex-col justify-start items-start">
              {icon}
              <div className="text-2xl font-semibold mb-3 text-foreground">{title}</div>
            </div>
            <div className="text-sm text-left text-muted-foreground">{content}</div>
            {id==activeCardId && (
              <TooltipDemo tooltip={"Go to map"}>
                <Link
                  href={`/map`}
                  onClick={() => {
                    setContext(context);
                  }}
                  className="absolute bottom-4 right-4 flex items-center rounded-full p-2 bg-foreground text-background/90 hover:text-background"
                >
                  <ChevronRight size={20} />
                </Link>
              </TooltipDemo>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-3">
        {textCards.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCardId(c.id)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${activeCardId === c.id ? "bg-primary" : "bg-border"
              }`}
            aria-label={`切換到${c.title}`}
          />
        ))}
      </div>
    </div>
  );
}