"use client";

import dynamic from "next/dynamic";

const CytoscapeComponent = dynamic(() => import("react-cytoscapejs"), {
  ssr: false,
});

const elements = [
  { data: { id: "Place", label: "Place" } },
  { data: { id: "Building", label: "Building" } },
  {
    data: {
      id: "isPartOf",
      source: "Building",
      target: "Place",
      label: "isPartOf",
    },
  },
];

export default function OntologyPage() {
  return (
    <div className="w-full h-screen p-4">
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        layout={{ name: "cose" }}
      />
    </div>
  );
}