import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
    colorScheme: {
      purple: "", // Default, class applied in component
      teal: "",
      sunset: "",
      cosmic: "",
      neon: "",
    },
    intensity: {
      subtle: "opacity-60",
      medium: "opacity-80",
      strong: "opacity-100",
    },
    size: {
      small: "",
      medium: "",
      large: "",
    },
  },
  defaultVariants: {
    variant: "center",
    colorScheme: "purple",
    intensity: "medium",
    size: "medium",
  },
});

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof glowVariants> & {
      animated?: boolean;
      showStars?: boolean;
    }
>(
  (
    {
      className,
      variant,
      colorScheme,
      intensity,
      size,
      animated = false,
      showStars = false,
      ...props
    },
    ref
  ) => {
    const starsRef = useRef<HTMLDivElement>(null);

    // Define color schemes
    const colorSchemes = {
      purple: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.5)_10%,_rgba(147,51,234,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(192,132,252,0.4)_10%,_rgba(192,132,252,0)_60%)]",
        starColor: "rgba(192,132,252,0.8)",
      },
      teal: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.5)_10%,_rgba(20,184,166,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(45,212,191,0.4)_10%,_rgba(45,212,191,0)_60%)]",
        starColor: "rgba(45,212,191,0.8)",
      },
      sunset: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.5)_10%,_rgba(234,88,12,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(251,146,60,0.4)_10%,_rgba(251,146,60,0)_60%)]",
        starColor: "rgba(251,146,60,0.8)",
      },
      cosmic: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(76,29,149,0.5)_10%,_rgba(76,29,149,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.4)_10%,_rgba(124,58,237,0)_70%)]",
        starColor: "rgba(124,58,237,0.8)",
      },
      neon: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.5)_10%,_rgba(16,185,129,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.4)_10%,_rgba(250,204,21,0)_60%)]",
        starColor: "rgba(16,185,129,0.8)",
      },
    };

    // Define size variations
    const sizeConfig = {
      small: {
        primary: "h-[200px] w-[50%] scale-[2]",
        secondary: "h-[100px] w-[30%] scale-[1.8]",
        tertiary: "h-[150px] w-[40%] scale-[1.5]",
      },
      medium: {
        primary: "h-[300px] w-[60%] scale-[2.5]",
        secondary: "h-[150px] w-[40%] scale-[2.2]",
        tertiary: "h-[200px] w-[50%] scale-[2]",
      },
      large: {
        primary: "h-[400px] w-[70%] scale-[3]",
        secondary: "h-[200px] w-[50%] scale-[2.5]",
        tertiary: "h-[250px] w-[60%] scale-[2.2]",
      },
    };

    // Animation classes
    const animationClasses = animated
      ? "animate-pulse transition-all duration-[3000ms]"
      : "";

    const selectedScheme = colorSchemes[colorScheme || "purple"];
    const selectedSize = sizeConfig[size || "medium"];

    // Create stars effect
    useEffect(() => {
      if (showStars && starsRef.current) {
        const starsContainer = starsRef.current;
        const starColor = selectedScheme.starColor;

        // Clear existing stars
        starsContainer.innerHTML = "";

        // Create stars
        const numStars = 50;
        const containerWidth = starsContainer.offsetWidth;
        const containerHeight = starsContainer.offsetHeight;

        for (let i = 0; i < numStars; i++) {
          const star = document.createElement("div");
          const size = Math.random() * 2 + 1;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 3 + 2;

          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.left = `${x}%`;
          star.style.top = `${y}%`;
          star.style.backgroundColor = starColor;
          star.style.position = "absolute";
          star.style.borderRadius = "50%";
          star.style.animation = `twinkle ${duration}s infinite ${delay}s`;

          starsContainer.appendChild(star);
        }
      }
    }, [showStars, colorScheme]);

    return (
      <div
        ref={ref}
        className={cn(
          glowVariants({ variant, colorScheme, intensity, size }),
          className
        )}
        {...props}
      >
        {/* Primary glow */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 rounded-[50%]",
            selectedSize.primary,
            selectedScheme.primary,
            animationClasses,
            variant === "center" && "-translate-y-1/2"
          )}
        />

        {/* Secondary glow */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 rounded-[50%]",
            selectedSize.secondary,
            selectedScheme.secondary,
            animated
              ? "animate-pulse delay-300 transition-all duration-[3500ms]"
              : "",
            variant === "center" && "-translate-y-1/2"
          )}
        />

        {/* Third glow for extra dimension */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 rounded-[50%] opacity-70 mix-blend-screen",
            selectedSize.tertiary,
            colorScheme === "purple"
              ? "bg-[radial-gradient(ellipse_at_center,_rgba(219,39,119,0.3)_10%,_rgba(219,39,119,0)_60%)]"
              : colorScheme === "teal"
              ? "bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.3)_10%,_rgba(6,182,212,0)_60%)]"
              : colorScheme === "sunset"
              ? "bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.3)_10%,_rgba(249,115,22,0)_60%)]"
              : colorScheme === "cosmic"
              ? "bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.3)_10%,_rgba(139,92,246,0)_60%)]"
              : "bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.3)_10%,_rgba(37,99,235,0)_60%)]",
            animated
              ? "animate-pulse delay-600 transition-all duration-[4000ms]"
              : "",
            variant === "center" && "-translate-y-1/2"
          )}
        />

        {/* Stars container */}
        {showStars && (
          <div
            ref={starsRef}
            className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden"
          />
        )}

        {/* CSS animation for stars */}
        {showStars && (
          <style jsx global>{`
            @keyframes twinkle {
              0% {
                opacity: 0.2;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0.2;
              }
            }
          `}</style>
        )}
      </div>
    );
  }
);

Glow.displayName = "Glow";

export { Glow };
