'use client';

import { useEffect, useState } from "react";
import { useProgress } from "@/context/ProgressContext";
import { streamLocationDescription } from "@/lib/api";

export function useRunStreamingLocationDescription(geojson: JSON, context: string) {
  const { setSteps } = useProgress();
  const [templateData, setTemplateData] = useState<any | null>(null);

  useEffect(() => {
    if (!geojson || !context) return;

    const stepLabels = [
      "Request received",
      "Typology loaded",
      "Buffer determined",
      "Database query",
      "Spatial relation reasoning",
      "Semantic reasoning",
      "Template generation",
      "Complete"
    ];

    setSteps(stepLabels.map(label => ({ label, status: "pending" })));

    let abortController: AbortController | null = null;

    streamLocationDescription(
      geojson,
      context,
      (data) => {
        setSteps(prev =>
          prev.map(step =>
            step.label === data.stage
              ? {
                  ...step,
                  status: data.status === "done" ? "completed" : "active",
                  details: data.result ? JSON.stringify(data.result, null, 2) : step.details
                }
              : step
          )
        );

        if (data.stage === "Template generation" && data.result) {
          setTemplateData(data.result);
        }
      }
    ).then(controller => {
      abortController = controller;
    });

    return () => {
      abortController?.abort();
    };
  }, [geojson, context, setSteps]);

  return { templateData };
}