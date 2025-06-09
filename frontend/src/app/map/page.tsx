"use client";

import { MapViewer } from '@/components/map/MapViewer';
import { useSearchParams } from 'next/navigation';

export default function MapPage() {
  const searchParams = useSearchParams();
  const featureId = searchParams.get('featureId');

  return (
    <>
      <MapViewer featureId={featureId} />
    </>
  );
}