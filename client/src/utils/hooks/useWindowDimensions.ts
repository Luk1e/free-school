// Import react
import { useState, useEffect } from 'react';

// Function to get window dimensions
function getWindowDimensions() {
    const width = window.innerWidth
    const height = window.innerHeight
    return {
        width,
        height
    };
}

// Export useWindowDimensions hook
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}