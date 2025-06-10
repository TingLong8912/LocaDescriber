import React, { useState, useRef, useEffect } from "react";

const textCards = [
  {
    id: 1,
    title: "Traffic",
    content: "Due to road collapse and other factors, warning should be given to the road users within the information of road.",
    gradient: "bg-primary"
  },
  {
    id: 2,
    title: "Reservoir Discharge",
    content: "The reservoir begins to conduct regulatory discharge, flood discharge or free overflow.",
    gradient: "bg-primary"
  },
  {
    id: 3,
    title: "Torrential Rain",
    content: "The Instant Torrential Rain Alert release method is a thunderstorm event accompanied by lightning convection, and the latest instant message is provided according to the convective life cycle.",
    gradient: "bg-primary"
  },
  {
    id: 4,
    title: "Earthquake",
    content: "The earthquake alert is released when the earthquake magnitude scale is detected greater than 5.0, and the estimated seismic intensity scales where the city hall located in each city and county reached level 4. Or when  the earthquake magnitude scale is detected greater than 6.5, and the estimated seismic intensity scales where the city hall located in each city and county reached level 3.",
    gradient: "bg-primary"
  },
  {
    id: 5,
    title: "Tsunami",
    content: "When the Central Weather Administration issues or lifts a tsunami warning in Taiwan, it is aimed for the coastal residents in Taiwan, Penghu, Kinmen and Matsu.",
    gradient: "bg-primary"
  },
];

export default function TextCardSlider() {
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
    <div className="w-full py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight">Scenarios</h2>
      <div ref={containerRef} className="flex space-x-8 py-15 px-10 overflow-x-auto scrollbar-hide">
        {textCards.map(({ id, title, content, gradient }) => (
          <div
            key={id}
            className={`min-w-[320px] max-w-[320px] h-[320px] px-5 py-8 flex-shrink-0 shadow-md rounded-md overflow-hidden hover:shadow-xl/10 transition-shadow duration-300 cursor-pointer relative group ${gradient} ${activeCardId === id ? "scale-105 ring-4 ring-primary" : "scale-100"
              }`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveCardId(id)}
          >
            <div className="text-xl text-center font-semibold mb-3 text-background">{title}</div>
            <div className="text-sm text-center text-muted">{content}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-3">
        {textCards.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCardId(c.id)}
            className={`w-5 h-5 rounded-full transition-all duration-200 ${activeCardId === c.id ? "bg-primary" : "bg-muted"
              }`}
            aria-label={`切換到${c.title}`}
          />
        ))}
      </div>
    </div>
  );
}