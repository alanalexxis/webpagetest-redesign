"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box, Lock, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "../ui/glowing-effect";
import { motion } from "framer-motion";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const GridItem = ({ area, icon, title, description, delay }: GridItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Variantes para el contenedor principal - ahora con animación más rápida
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        // Reducir el tiempo entre elementos hijos para que aparezcan casi al mismo tiempo
        staggerChildren: 0.05,
      },
    },
  };

  // Variantes para el icono - ahora con menos retraso
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        // Reducir el retraso adicional
        delay: 0.05,
      },
    },
  };

  // Nueva animación para el título - ahora aparecen todas las letras más rápido
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Reducir el retraso adicional
        delayChildren: 0.05,
        // Hacer que las letras aparezcan casi simultáneamente
        staggerChildren: 0.01,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  // Nueva animación para la descripción - menos retraso
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        // Reducir el retraso adicional
        delay: 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        // Reducir el retraso adicional
        delay: 0.1,
        ease: "easeOut",
      },
    },
  };

  // Divide el título en letras individuales para la animación
  const titleLetters = Array.from(title);

  return (
    <motion.li
      className={cn("min-h-[14rem] list-none", area)}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 transition-all duration-300 hover:shadow-lg">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.005}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 backdrop-blur-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <motion.div
              className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2"
              variants={iconVariants}
            >
              {icon}
            </motion.div>
            <div className="space-y-3">
              <motion.h3
                className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white flex flex-wrap"
                variants={titleContainerVariants}
              >
                {titleLetters.map((letter, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h3>
              <motion.h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-slate-300"
                variants={descriptionVariants}
              >
                {description}
              </motion.h2>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/15 to-fuchsia-600/15 blur-3xl"
          style={{ transform: "translateZ(0)" }}
          variants={glowVariants}
        />
        {/* Background elements - optimized with hardware acceleration */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-96 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/15 to-blue-600/15 blur-3xl"
            style={{ transform: "translateZ(0)" }}
          ></div>
        </div>
      </div>
    </motion.li>
  );
};

export function GlowingEffectDemo() {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        // Hacer que todos los elementos aparezcan casi simultáneamente
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="flex justify-center w-full py-8"
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      <ul className="grid grid-cols-1 gap-4 max-w-5xl w-[90%] md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem]">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
          icon={<Box className="h-4 w-4" />}
          title="Real Experience"
          description="Test your user's real experience with global locations, modern devices, and the latest browser versions."
          delay={0}
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]"
          icon={<Settings className="h-4 w-4" />}
          title="Video Capture"
          description="Correlate your user's visual experience to the technical measurements of your site."
          delay={0.05}
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]"
          icon={<Lock className="h-4 w-4" />}
          title="In-Depth Metrics"
          description="Dive into the anatomy of your webpage with components like DNS, TCP, TLS, and more."
          delay={0.1}
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]"
          icon={<Search className="h-4 w-4" />}
          title="Performance Analysis"
          description="Identify bottlenecks and optimize your application with comprehensive performance insights."
          delay={0.15}
        />
      </ul>
    </motion.div>
  );
}
