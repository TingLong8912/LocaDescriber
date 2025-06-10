'use client'

import { motion } from 'framer-motion';
import IntroBanner from "@/components/layout/IntroBanner";
import AbstractBlock from "@/components/layout/AbstractBlock";
import CaseGrid from "@/components/layout/CaseGrid";
import ThesisDetails from "@/components/layout/ThesisDetails";
import FadeInSection from '@/components/ui/FadeInSection';
import TextCardSlider from '@/components/layout/TextCardSlider';

export default function HomePage() {
  return (
    <div className="space-y-16 overflow-scroll h-[calc(100vh-4rem)] py-8">
      <FadeInSection>
        <IntroBanner />
      </FadeInSection>
      <FadeInSection>
        <CaseGrid />
      </FadeInSection>
      <FadeInSection>
        <ThesisDetails />
      </FadeInSection>
      <FadeInSection>
        <TextCardSlider />
      </FadeInSection>
    </div>
  );
}
