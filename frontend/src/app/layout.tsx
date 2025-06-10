import Head from 'next/head';
import './globals.css';
import { Inter } from 'next/font/google';
import { MapProvider } from "@/context/MapContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { LayoutShell } from '@/components/layout/LayoutShell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'LocaDescriber',
  description: '位置描述展示平台',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className={inter.variable}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <ProgressProvider>
          <MapProvider>
            <LayoutShell>{children}</LayoutShell>
          </MapProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}