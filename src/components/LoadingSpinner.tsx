
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold-400 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gold-400 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
