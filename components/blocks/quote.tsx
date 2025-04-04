"use client";

import DotPattern from "../ui/dot-pattern-1";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "../ui/text-generated";
import { motion } from "framer-motion";

export function Quote() {
  const words = `The best professional web performance investigators I know use WPT as a critical part of their workflows, and it's the center of mine. `;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const decorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <div className="mx-auto my-16 max-w-5xl px-4 md:my-24 xl:px-0">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-gray-500/30 bg-black/20 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl"
          variants={decorVariants}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl"
          variants={decorVariants}
        />

        {/* Dot pattern background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          variants={itemVariants}
        >
          <DotPattern width={5} height={5} />
        </motion.div>

        {/* Corner accents */}
        <motion.div
          className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/30"
          variants={decorVariants}
        />
        <motion.div
          className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/30"
          variants={decorVariants}
        />
        <motion.div
          className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/30"
          variants={decorVariants}
        />
        <motion.div
          className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/30"
          variants={decorVariants}
        />

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-4xl p-8 md:p-12 xl:p-16">
          {/* Quote marks */}
          <motion.div
            className="absolute -left-2 top-8 text-8xl font-serif text-fuchsia-500/20 md:text-9xl"
            variants={itemVariants}
          >
            "
          </motion.div>
          <motion.div
            className="absolute -bottom-32 -right-2 text-8xl font-serif text-fuchsia-500/20 md:text-9xl"
            variants={itemVariants}
          >
            "
          </motion.div>

          {/* Quote text */}
          <motion.div className="relative" variants={itemVariants}>
            <blockquote className="text-xl font-medium tracking-tight text-white md:text-2xl lg:text-3xl xl:text-4xl">
              <span className="leading-relaxed">
                <TextGenerateEffect words={words} />
              </span>
            </blockquote>

            {/* Author info */}
            <motion.div
              className="mt-8 flex items-center border-l-2 border-fuchsia-500/50 pl-4"
              variants={itemVariants}
            >
              <div>
                <p className="font-medium text-white md:text-lg">
                  Alex Russell
                </p>
                <p className="text-sm text-gray-400">
                  Program Manager, Microsoft Edge
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
