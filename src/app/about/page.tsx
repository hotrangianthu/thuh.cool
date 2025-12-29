'use client';

import React from 'react';
import VoronoiMindspace from '@/components/VoronoiMindspace';

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
