import { useEffect, useRef } from 'react';

type SpiderWebProps = {
  theme?: 'default' | 'spiderman';
};

const SpiderWeb = ({ theme = 'default' }: SpiderWebProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const isSpiderManTheme = theme === 'spiderman';
    const colors = ['#ff003c', '#00e5ff'];
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawSpiderManWeb = (time: number) => {
      const centerX = w * 0.52 + Math.sin(time * 0.0005) * 18;
      const centerY = h * 0.44 + Math.cos(time * 0.00045) * 12;
      const spokeCount = 12;
      const ringCount = 7;
      const maxRadius = Math.min(w, h) * 0.42;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let ring = 1; ring <= ringCount; ring++) {
        const radius = (maxRadius / ringCount) * ring;
        ctx.beginPath();
        for (let step = 0; step <= 120; step++) {
          const angle = (Math.PI * 2 * step) / 120;
          const wobble = Math.sin(angle * spokeCount + time * 0.0007 + ring) * 3;
          const x = centerX + Math.cos(angle) * (radius + wobble);
          const y = centerY + Math.sin(angle) * (radius + wobble * 0.6);
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring % 2 === 0 ? 'rgba(0,229,255,0.16)' : 'rgba(255,0,60,0.18)';
        ctx.shadowBlur = 18;
        ctx.shadowColor = ring % 2 === 0 ? '#00e5ff' : '#ff003c';
        ctx.lineWidth = ring === ringCount ? 1.8 : 1.2;
        ctx.stroke();
      }

      for (let spoke = 0; spoke < spokeCount; spoke++) {
        const angle = (Math.PI * 2 * spoke) / spokeCount;
        ctx.beginPath();
        for (let step = 0; step <= 28; step++) {
          const t = step / 28;
          const radius = maxRadius * t;
          const curve = Math.sin(t * Math.PI * 2 + time * 0.001 + spoke) * (8 + spoke % 3 * 2);
          const x = centerX + Math.cos(angle) * radius + Math.cos(angle + Math.PI / 2) * curve;
          const y = centerY + Math.sin(angle) * radius + Math.sin(angle + Math.PI / 2) * curve;
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = spoke % 2 === 0 ? 'rgba(255,255,255,0.14)' : 'rgba(0,229,255,0.14)';
        ctx.shadowBlur = 14;
        ctx.shadowColor = spoke % 2 === 0 ? '#ffffff' : '#00e5ff';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      const pulseAngle = (time * 0.00045) % (Math.PI * 2);
      const pulseRadius = maxRadius * 0.72;
      const pulseX = centerX + Math.cos(pulseAngle) * pulseRadius;
      const pulseY = centerY + Math.sin(pulseAngle) * pulseRadius;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ff003c';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#ff003c';
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#ff003c';
      ctx.fill();

      ctx.restore();
    };

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    const animate = (time = 0) => {
      ctx.clearRect(0, 0, w, h);

      if (isSpiderManTheme) {
        drawSpiderManWeb(time);

        const targetX = mouse.x > -999 ? mouse.x : w * 0.52;
        const targetY = mouse.y > -999 ? mouse.y : h * 0.48;
        ctx.beginPath();
        ctx.moveTo(w * 0.52, h * 0.44);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = 'rgba(255,0,60,0.28)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff003c';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      } else {
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          const dxMouse = mouse.x - particles[i].x;
          const dyMouse = mouse.y - particles[i].y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 250) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = 1 - distMouse / 250;
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 150) * 0.4})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-80 mix-blend-screen"
    />
  );
};

export default SpiderWeb;
