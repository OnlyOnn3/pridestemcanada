'use client'; 

import { Suspense } from 'react';
import ConferencePage from './conferencePage';

export default function page() {
  return (
    <Suspense fallback={<div>Loading conference data...</div>}> 
      <ConferencePage />
    </Suspense>
  );
}