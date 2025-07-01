
import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    // Initialize Tawk_API if it doesn't exist
    if (!window.Tawk_API) {
      window.Tawk_API = {};
      window.Tawk_LoadStart = new Date();
    }

    // Check if script is already loaded
    if (document.getElementById('tawk-to-script')) {
      return;
    }

    // Create and load the Tawk.to script
    const script = document.createElement('script');
    script.id = 'tawk-to-script';
    script.async = true;
    script.src = 'https://embed.tawk.to/686383101c010c190e03883d/1iv2bfubf';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Insert the script into the document
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.getElementById('tawk-to-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkToWidget;
