import { useState } from "react";

export default function ThesisDetails() {
  const sections = [
    {
      title: "Research Background and Motivation",
      content: <p>This study analyzes the semantic ambiguity of geographic spatial descriptions...</p>,
      image: "/images/image1.jpg",
    },
    {
      title: "Research Methods",
      content: <p>Combines the DOLCE upper ontology, SWRL rule reasoning, and geographic semantic relationship modeling...</p>,
      image: "/images/image2.jpg",
    },
    {
      title: "Research Contributions",
      content: (
        <ul className="list-disc list-inside">
          <li>Proposed a semantic spatial relationship inference framework</li>
          <li>Integrated WebGIS with ontology technology</li>
          <li>Applied to the generation of spatial explanations in disaster contexts</li>
        </ul>
      ),
      image: "/images/image3.jpg",
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
        <div className="hidden lg:flex lg:w-1/2 lg:pl-4 items-center justify-center relative border">
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