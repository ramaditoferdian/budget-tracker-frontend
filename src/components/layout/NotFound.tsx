'use client';

import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 w-full">
      <h1 className="text-4xl font-bold text-neutral-800 mb-2">Page not found</h1>
      <p className="text-neutral-500 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
