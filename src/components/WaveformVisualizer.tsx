import React, { useEffect, useRef, createElement } from 'react';
const WaveformVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const barCount = 40;
    const bars: HTMLDivElement[] = [];
    // Create bars
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'absolute bottom-0 w-1.5 rounded-full bg-gradient-to-t from-orange-500 to-orange-400';
      bar.style.left = `${i / barCount * 100}%`;
      bar.style.opacity = '0.8';
      container.appendChild(bar);
      bars.push(bar);
    }
    // Animate bars
    const animate = () => {
      bars.forEach(bar => {
        const height = Math.random() * 100;
        bar.style.height = `${height}%`;
        bar.style.transition = `height ${Math.random() * 0.3 + 0.2}s ease`;
      });
      animationId = requestAnimationFrame(animate);
    };
    let animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
      bars.forEach(bar => bar.remove());
    };
  }, []);
  return <div ref={containerRef} className="relative w-full h-full backdrop-blur-2xl bg-white/30 rounded-xl border border-white/50" />;
};
export default WaveformVisualizer;