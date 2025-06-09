"use client";

import dynamic from "next/dynamic";

const CytoscapeComponent = dynamic(() => import("react-cytoscapejs"), {
  ssr: false,
});

import elements from "@/data/ontology/LocD.json";

export default function OntologyPage() {
  return (
    <div className="w-full h-screen p-4">
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        layout={{
          name: "cose",
          directed: true,
          padding: 10,
          spacingFactor: 2.5
        }}
        stylesheet={[
          {
            selector: ".depth-0",
            style: {
              width: 80,
              height: 80,
              "font-size": 16
            }
          },
          {
            selector: ".depth-1",
            style: {
              width: 60,
              height: 60,
              "font-size": 14
            }
          },
          {
            selector: ".depth-2",
            style: {
              width: 50,
              height: 50,
              "font-size": 12
            }
          },
          {
            selector: "node:childless",
            style: {
              width: 70,
              height: 70,
              "font-size": 14
            }
          },
          {
            selector: "node",
            style: {
              width: 50,
              height: 50,
              label: "data(label)",
              "font-size": 12,
              "text-valign": "center",
              "text-halign": "center"
            }
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
              label: "data(label)",
              "font-size": 10,
              "curve-style": "bezier"
            }
          }
        ]}
      />
    </div>
  );
}