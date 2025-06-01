'use client';

import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface TypeWriterProps {
  text: string;
  className?: string;
}

export default function TypeWriter({ text, className = '' }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentLength = displayText.length;

    if (!isPaused) {
      if (!isDeleting && currentLength < text.length) {
        // Typing
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentLength + 1));
        }, 100);
      } else if (isDeleting && currentLength > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentLength - 1));
        }, 50);
      } else if (currentLength === text.length) {
        // Pause at the end of typing
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setIsPaused(false);
        }, 2000);
      } else if (currentLength === 0) {
        // Pause at the start
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setIsPaused(false);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, text]);

  return (
    <animated.span style={springProps} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </animated.span>
  );
} 