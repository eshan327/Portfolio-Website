'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: {
            value: 80,
          },
          color: {
            value: '#ffffff',
          },
          links: {
            enable: true,
            color: '#ffffff',
            distance: 150,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          opacity: {
            value: 0.2,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
      className="fixed inset-0 -z-10"
    />
  );
} 