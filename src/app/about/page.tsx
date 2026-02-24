'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const VoronoiMindspace = dynamic(() => import('@/components/VoronoiMindspace'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="h-8 w-8 animate-pulse rounded-full border-2 border-accent-orange/50 border-t-accent-orange" />
    </div>
  ),
});

export default function AboutPage() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-transparent">
      {/* 
          The RootLayout already provides a /bg.png at z-[-1].
          VoronoiMindspace will render its own interactive shards on top.
      */}
      <VoronoiMindspace />
    </main>
  );
}
