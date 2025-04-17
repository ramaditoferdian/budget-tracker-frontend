'use client';

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
        <p className="text-sm text-neutral-500">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
