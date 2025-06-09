import { useState } from "react";

export default function ThesisDetails() {
  const sections = [
    {
      title: "Research Background and Motivation",
      content: <p>
        The current capabilities of GIS in handling semantic information remain largely limited to the geometric level, lacking effective methods to support the semantic understanding of location and the generation of location descriptions. This limitation is particularly evident in reverse geocoding, where the process of converting coordinates into human-readable descriptions often relies solely on administrative or address-based data, failing to capture contextual or semantic spatial relationships. Consequently, enabling spatial data to carry semantic understanding and expressive capabilities regarding location has emerged as a critical research challenge, especially in applications that require more nuanced or context-aware location descriptions, such as disaster response or spatial decision support.
      </p>,
      image: "/images/congition.png",
    },
    {
      title: "Research Methods",
      content: <p>An ontology-based semantic location description (O-SLD) framework is proposed to integrate spatial data with semantic knowledge of location descriptions for natural language semantic representation.</p>,
      image: "/images/three-layered.png",
    },
    {
      title: "Research Contributions",
      content: (
        <ul className="list-disc list-inside">
          <li>Proposed a locational semantic inference framework</li>
          <li>Integrated WebGIS with ontology and SWRL technology</li>
          <li>Applied to the generation of location descriptions in traffic and diaster warning contexts</li>
        </ul>
      ),
      // image: "/images/image3.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto h-auto px-20 py-30 space-y-4 text-foreground bg-secondary">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full lg:w-1/2 lg:pr-4">
          {sections.map((section, index) => (
            <div key={index} className="border-b border-border py-4 last:border-b-0">
              <button
                className="w-full text-left text-2xl font-semibold py-2 hover:underline focus:outline-none"
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              >
                {section.title}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  index === activeIndex ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2">{section.content}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden h-100 lg:flex lg:w-1/2 lg:pl-4 items-center justify-center relative">
          {sections.map((section, index) => (
            <img
              key={index}
              src={section.image}
              alt=""
              className={`transition-all duration-500 ease-in-out transform ${
                index === activeIndex
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 -translate-y-4 absolute"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}