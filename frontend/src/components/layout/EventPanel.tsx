'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ProgressItem from '@/components/ui/ProgressItem';
import { CheckCheck, CircleDashed, LoaderCircle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useMapContext } from '@/context/MapContext';
import { GeoJSON } from 'ol/format';
import { Vector } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

export function EventPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        key="eventpanel-desktop"
        initial={{ x: 260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 260, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 right-0 z-30 w-64 h-full border-l bg-background py-4 hidden lg:block"
      >
        <SidebarContent onClose={onClose} />
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.div
        key="eventpanel-mobile"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 right-0 z-40 w-64 bg-background p-4 lg:hidden"
      >
        <SidebarContent onClose={onClose} />
      </motion.div>
    </>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const { steps } = useProgress();
  const { map } = useMapContext(); // 假設 context 中提供 map
  const lastStep = steps.length > 0 ? steps[steps.length - 1] : undefined;
  let multiLocadResults: string[] = [];
  if (lastStep?.details) {
    try {
      const obj = JSON.parse(lastStep.details);
      if (obj && Array.isArray(obj.multiLocad_results)) {
        multiLocadResults = obj.multiLocad_results;
      }
    } catch (e) {
      // fallback: 只顯示 details
      multiLocadResults = [lastStep.details];
    }
  }
  const [resultIndex, setResultIndex] = useState(0);
  const finalResult = multiLocadResults[resultIndex] || "";

  const [copied, setCopied] = useState(false);
  const [outputGeoJSON, setOutputGeoJSON] = useState(false);

  const handleCopy = () => {
    if (finalResult) {
      navigator.clipboard.writeText(finalResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const handleOutputGeoJSON = () => {
    if (!map) return;

    const layers = map.getLayers().getArray();
    const drawLayer = layers.find(
      layer => layer.get('name') === 'drawLayer'
    ) as any | undefined;

    if (drawLayer) {
      const features = drawLayer.getSource().getFeatures();
      const geojson = new GeoJSON().writeFeatures(features, {
        featureProjection: map.getView().getProjection(),
      });
      navigator.clipboard.writeText(geojson);
      setOutputGeoJSON(true);
      setTimeout(() => setOutputGeoJSON(false), 1200);
    }
  };

  const hasOtherResults = multiLocadResults.length > 1;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <span className="text-md h-11 px-3 font-semibold flex items-end">Processing Steps</span>
      <div className="flex flex-col items-stretch">
        {steps.map((step, i) => (
          <Step key={i} label={step.label} status={step.status} details={step.details} />
        ))}
      </div>
      {finalResult && (
        <div className="mt-5 mx-2 p-2 border rounded-md bg-primary text-primary-foreground">
          <div className="flex items-center justify-between mb-1">
            <span className="text-md h-10 px-3 font-semibold flex items-center">
              Result{hasOtherResults ? ` (${resultIndex + 1}/${multiLocadResults.length})` : ""}
            </span>
            {hasOtherResults && (
              <div className="flex gap-1">
                <button
                  className="text-xs px-2 py-1 rounded bg-muted-foreground text-muted hover:bg-primary/80"
                  onClick={() => setResultIndex((i) => (i - 1 + multiLocadResults.length) % multiLocadResults.length)}
                  disabled={resultIndex === 0}
                >
                  Prev
                </button>
                <button
                  className="text-xs px-2 py-1 rounded bg-muted-foreground text-muted hover:bg-primary/80"
                  onClick={() => setResultIndex((i) => (i + 1) % multiLocadResults.length)}
                  disabled={resultIndex === multiLocadResults.length - 1}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <pre className="p-2 whitespace-pre-wrap text-lg max-h-40 overflow-auto">{finalResult}</pre>
          <div>
            <button
              className="text-xs px-2 py-1 rounded bg-muted-foreground text-muted hover:bg-primary/80 mr-1"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "LocD"}
            </button>
            <button
              className="text-xs px-2 py-1 rounded bg-muted-foreground text-muted hover:bg-primary/80"
              onClick={handleOutputGeoJSON}
            >
              {outputGeoJSON ? "Copied!" : "GeoJSON"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({
  label,
  status,
  details,
}: {
  label: string;
  status: 'completed' | 'active' | 'pending';
  details?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = {
    completed: "text-green-600",
    active: "text-blue-600",
    pending: "text-gray-400",
  };

  const icon = {
    completed: <CheckCheck />,
    active: <LoaderCircle className="animate-spin" />,
    pending: <CircleDashed />,
  };

  return (
    <div>
      <ProgressItem
        label={label}
        icon={icon[status]}
        actived={status === "active"}
        onClick={() => details && setExpanded(!expanded)}
      />
      {expanded && details && (
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">{details}</div>
      )}
    </div>
  );
}