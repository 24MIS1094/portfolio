import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const crosshairHRef = useRef<HTMLDivElement>(null);
  const crosshairVRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const clickWaveRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const [isPreloader, setIsPreloader] = useState(true);

  // Check if user has entered the app by monitoring the presence of nav/pages
  useEffect(() => {
    const checkAppShell = () => {
      const entered = document.querySelector('.app-shell') !== null && !document.querySelector('.cursor-none.overflow-hidden');
      // If we see page nodes or the preloader is absent, set isPreloader to false
      if (entered) {
        setIsPreloader(false);
      } else {
        setIsPreloader(true);
      }
    };
    
    // Initial check
    checkAppShell();
    
    // Periodically re-check for entry transitions
    const interval = setInterval(checkAppShell, 100);
    return () => clearInterval(interval);
  }, [location.pathname]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const crosshairH = crosshairHRef.current;
    const crosshairV = crosshairVRef.current;
    const coords = coordsRef.current;
    const clickWave = clickWaveRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    
    let isHovering = false;
    let isClicking = false;
    let isInsideViewport = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isInsideViewport = true;
    };

    const onMouseDown = () => {
      isClicking = true;
      if (clickWave) {
        clickWave.style.left = `${mouseX}px`;
        clickWave.style.top = `${mouseY}px`;
        clickWave.style.transform = 'translate(-50%, -50%) scale(0)';
        clickWave.style.opacity = '1';
        // Force reflow
        void clickWave.offsetWidth;
        clickWave.style.transition = 'transform 0.45s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.45s ease-out';
        clickWave.style.transform = 'translate(-50%, -50%) scale(3.2)';
        clickWave.style.opacity = '0';
      }
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    // Blistering-fast event delegation at the window level!
    // No MutationObserver, no querySelectorAll, zero DOM traversal overhead.
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const interactive = target.closest(
        'a, button, input, [role="button"], select, textarea, .cursor-pointer, .hover-float-github, .hover-ring-phone, .hover-bounce-whatsapp, [class*="hover-"]'
      );
      
      isHovering = !!interactive;
    };

    const onMouseLeaveWindow = () => {
      isInsideViewport = false;
      // Fade out cursor elements offscreen immediately
      mouseX = -200;
      mouseY = -200;
    };

    const onMouseEnterWindow = (e: MouseEvent) => {
      isInsideViewport = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    let animationFrameId: number;

    const render = () => {
      // 1. Direct DOM translate values updates
      // Core dot tracks mouse 1:1 with absolutely zero lag
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      
      // Snappy and dynamic tracking speed! Faster lerp coefficient: 0.48 standard, 0.65 hover
      const lerpFactor = isHovering ? 0.65 : 0.48;
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * lerpFactor;
      ringY += dy * lerpFactor;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (crosshairH && crosshairV) {
        crosshairH.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        crosshairV.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      // Show/hide cursor reticle container depending on window boundaries
      const opacityValue = isInsideViewport && mouseX > 0 && mouseY > 0 ? '1' : '0';
      dot.style.opacity = opacityValue;
      ring.style.opacity = opacityValue;
      if (coords) coords.style.opacity = opacityValue;

      // 2. Cybernetic Aesthetic State Upgrades
      const inPreloaderMode = document.querySelector('.app-shell') === null;

      if (inPreloaderMode) {
        // Preloader specialized HUD cursor details
        ring.style.width = '42px';
        ring.style.height = '42px';
        ring.style.borderColor = 'rgba(6, 182, 212, 0.6)';
        ring.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.25), inset 0 0 10px rgba(6, 182, 212, 0.15)';
        
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = '#00f0ff';
        dot.style.boxShadow = '0 0 12px rgba(0, 240, 255, 0.8)';
        
        if (crosshairH && crosshairV) {
          crosshairH.style.opacity = '0.35';
          crosshairV.style.opacity = '0.35';
        }
      } else if (isHovering) {
        // High-end Cyber-hover scale & color morph
        ring.style.width = '64px';
        ring.style.height = '64px';
        ring.style.borderColor = '#ff007f';
        ring.style.boxShadow = '0 0 35px rgba(255, 0, 127, 0.45), inset 0 0 15px rgba(255, 0, 127, 0.15)';
        
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.backgroundColor = '#ff007f';
        dot.style.boxShadow = '0 0 20px rgba(255, 0, 127, 0.9)';
        
        if (crosshairH && crosshairV) {
          crosshairH.style.opacity = '0.15';
          crosshairV.style.opacity = '0.15';
        }
      } else if (isClicking) {
        // Tactile compression ring snap
        ring.style.width = '24px';
        ring.style.height = '24px';
        ring.style.borderColor = '#ab00ff';
        ring.style.boxShadow = '0 0 40px rgba(171, 0, 255, 0.7), inset 0 0 8px rgba(171, 0, 255, 0.2)';
        
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.backgroundColor = '#ab00ff';
        dot.style.boxShadow = '0 0 8px rgba(171, 0, 255, 0.5)';
        
        if (crosshairH && crosshairV) {
          crosshairH.style.opacity = '0';
          crosshairV.style.opacity = '0';
        }
      } else {
        // Standard sleek desktop view mode
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(0, 240, 255, 0.45)';
        ring.style.boxShadow = '0 0 16px rgba(0, 240, 255, 0.15)';
        
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.backgroundColor = '#00f0ff';
        dot.style.boxShadow = '0 0 8px rgba(0, 240, 255, 0.6)';
        
        if (crosshairH && crosshairV) {
          crosshairH.style.opacity = '0';
          crosshairV.style.opacity = '0';
        }
      }

      // Update real-time HUD telemetry readout panel directly in DOM
      if (coords && mouseX > -10) {
        if (inPreloaderMode) {
          coords.innerHTML = `
            <span class="text-[6px] text-cyan-400/60 block tracking-[0.2em] mb-0.5">TARGET_LOCK // ON</span>
            <span>X: ${Math.round(mouseX)} Y: ${Math.round(mouseY)}</span>
          `;
          coords.style.borderColor = 'rgba(6, 182, 212, 0.3)';
          coords.style.color = '#00f0ff';
        } else if (isHovering) {
          coords.innerHTML = `<span>SYS // X:${Math.round(mouseX)} Y:${Math.round(mouseY)}</span>`;
          coords.style.borderColor = 'rgba(255, 0, 127, 0.3)';
          coords.style.color = '#ff007f';
        } else {
          coords.innerHTML = `<span>SYS // X:${Math.round(mouseX)} Y:${Math.round(mouseY)}</span>`;
          coords.style.borderColor = 'rgba(0, 240, 255, 0.2)';
          coords.style.color = '#00f0ff';
        }
        coords.style.transform = `translate3d(${mouseX + 16}px, ${mouseY + 16}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPreloader]);

  return (
    <>
      {/* 1. Concentric Click Shockwave overlay */}
      <div 
        ref={clickWaveRef}
        className="hidden lg:block fixed pointer-events-none z-[9999] h-10 w-10 rounded-full border border-purple-500 bg-purple-500/10 opacity-0 -translate-x-1/2 -translate-y-1/2 select-none"
      />

      {/* 2. Horizontal & Vertical Targeting Crosshair ticks */}
      <div 
        ref={crosshairHRef}
        className="hidden lg:block fixed pointer-events-none z-[9997] w-12 h-[1px] bg-cyan-400/40 opacity-0 -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-300"
        style={{ left: 0, top: 0 }}
      />
      <div 
        ref={crosshairVRef}
        className="hidden lg:block fixed pointer-events-none z-[9997] h-12 w-[1px] bg-cyan-400/40 opacity-0 -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-300"
        style={{ left: 0, top: 0 }}
      />

      {/* 3. Core glowing laser dot */}
      <div 
        ref={dotRef}
        className="hidden lg:block fixed pointer-events-none z-[9999] rounded-full select-none"
        style={{ left: 0, top: 0 }}
      />

      {/* 4. Outer Dial dial frame */}
      <div 
        ref={ringRef}
        className="hidden lg:block fixed pointer-events-none z-[9999] rounded-full border bg-transparent select-none transition-[width,height,border-color,box-shadow] duration-250 ease-out"
        style={{ left: 0, top: 0 }}
      >
        {/* Dual-concentric spinning tech rings (gyroscopic parallax aesthetic) */}
        {/* Clockwise Outer Tech dashed ring */}
        <div className="absolute inset-[-1.5px] rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '9s' }} />
        
        {/* Counter-Clockwise Inner Tech dashed ring */}
        <div className="absolute inset-[3px] rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />
        
        {/* Four responsive cyber corner brackets notches [ ] that move dynamically with parent size and color-inherit */}
        <div className="absolute top-[-3.5px] left-[-3.5px] w-1.5 h-1.5 border-t border-l border-inherit transition-all duration-300 ease-out" />
        <div className="absolute top-[-3.5px] right-[-3.5px] w-1.5 h-1.5 border-t border-r border-inherit transition-all duration-300 ease-out" />
        <div className="absolute bottom-[-3.5px] left-[-3.5px] w-1.5 h-1.5 border-b border-l border-inherit transition-all duration-300 ease-out" />
        <div className="absolute bottom-[-3.5px] right-[-3.5px] w-1.5 h-1.5 border-b border-r border-inherit transition-all duration-300 ease-out" />
      </div>

      {/* 5. Cyber coordinate metrics hud label */}
      <div 
        ref={coordsRef}
        className="hidden lg:block fixed pointer-events-none z-[9998] font-mono text-[7px] font-bold tracking-widest bg-black/85 border px-2 py-0.5 rounded shadow-lg select-none uppercase pointer-events-none transition-colors duration-300"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;
