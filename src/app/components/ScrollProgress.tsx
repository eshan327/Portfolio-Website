'use client';

import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const progressSpring = useSpring({
    width: `${scrollProgress}%`,
    config: {
      mass: 1,
      tension: 200,
      friction: 20,
    },
  });

  useEffect(() => {
    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <animated.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        style={progressSpring}
      />
    </div>
  );
} 