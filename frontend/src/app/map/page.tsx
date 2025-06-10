"use client";

import { MapViewer } from '@/components/map/MapViewer';
import { useSearchParams } from 'next/navigation';

export default function MapPage() {
  const searchParams = useSearchParams();
  const featureIdParam = searchParams.get('featureId');
  const featureId = featureIdParam === null ? undefined : featureIdParam;

  return (
    <>
      <MapViewer featureId={featureId} />
    </>
  );
}