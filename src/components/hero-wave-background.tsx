"use client";

import React, { useEffect, useRef } from "react";

export function HeroWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let time = 0;

    const draw = () => {
      time += 0.005;
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // Deep rich dark backdrop base
      const bgGrad = ctx.createRadialGradient(
        width * 0.3,
        height * 0.5,
        100,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, "#0e130f");
      bgGrad.addColorStop(0.5, "#080a08");
      bgGrad.addColorStop(1, "#040504");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const mouseFactorX = (mouseX / width - 0.5) * 30;
      const mouseFactorY = (mouseY / height - 0.5) * 20;

      // Draw glowing emerald / olive volumetric aura behind waves
      const glowGrad = ctx.createRadialGradient(
        width * 0.45 + mouseFactorX,
        height * 0.55 + mouseFactorY,
        50,
        width * 0.45,
        height * 0.55,
        width * 0.5
      );
      glowGrad.addColorStop(0, "rgba(76, 140, 70, 0.28)");
      glowGrad.addColorStop(0.35, "rgba(42, 95, 48, 0.18)");
      glowGrad.addColorStop(0.7, "rgba(20, 50, 25, 0.07)");
      glowGrad.addColorStop(1, "transparent");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(width * 0.45, height * 0.55, width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw Parametric Wave Mesh Ribbons (Olive / Emerald curves like Image 1)
      const numLines = 54;
      const points = 90;

      // Wave Ribbon System 1: Main sweeping diagonal mesh
      ctx.save();
      for (let i = 0; i < numLines; i++) {
        const offsetRatio = i / numLines;
        // Rich olive / emerald green color interpolation
        const r = Math.round(50 + offsetRatio * 40);
        const g = Math.round(130 + offsetRatio * 60);
        const b = Math.round(65 + offsetRatio * 30);
        const alpha = (Math.sin(offsetRatio * Math.PI) * 0.35 + 0.08);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1.1;

        ctx.beginPath();

        for (let p = 0; p <= points; p++) {
          const t = p / points;
          const x = t * width;

          const wave1 = Math.sin(t * Math.PI * 2.4 + time * 1.3 + offsetRatio * 1.8);
          const wave2 = Math.cos(t * Math.PI * 1.5 - time * 0.9 + offsetRatio * 1.1);
          const wave3 = Math.sin(t * Math.PI * 3.2 + time * 0.6 + offsetRatio * 2.4);

          const envelope = Math.sin(t * Math.PI);
          const baseY = height * 0.55 + (offsetRatio - 0.5) * (height * 0.45);

          const y =
            baseY +
            wave1 * (75 + offsetRatio * 45) +
            wave2 * (55 * envelope) +
            wave3 * (25 * envelope) +
            mouseFactorY * (1 - t) * 0.9;

          if (p === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // Wave Ribbon System 2: Secondary fine overlay wave mesh
      ctx.save();
      const numLines2 = 40;
      for (let i = 0; i < numLines2; i++) {
        const offsetRatio = i / numLines2;
        const alpha = (Math.sin(offsetRatio * Math.PI) * 0.28 + 0.05);

        ctx.strokeStyle = `rgba(110, 195, 120, ${alpha})`;
        ctx.lineWidth = 0.9;

        ctx.beginPath();

        for (let p = 0; p <= points; p++) {
          const t = p / points;
          const x = t * width;

          const waveA = Math.cos(t * Math.PI * 3.0 - time * 1.2 + offsetRatio * 2.2);
          const waveB = Math.sin(t * Math.PI * 1.9 + time * 0.8 + offsetRatio * 1.4);

          const envelope = Math.sin(t * Math.PI);
          const baseY = height * 0.62 + (offsetRatio - 0.5) * (height * 0.38);

          const y =
            baseY +
            waveA * (60 + offsetRatio * 35) +
            waveB * (45 * envelope) -
            mouseFactorY * t * 0.7;

          if (p === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="hero-wireframe-canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-wireframe-canvas" />
      <div className="hero-olive-vignette" />
    </div>
  );
}
