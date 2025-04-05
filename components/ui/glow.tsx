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

      ...props
    },
    ref
  ) => {
    // Define color schemes
    const colorSchemes = {
      purple: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.5)_10%,_rgba(147,51,234,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(192,132,252,0.4)_10%,_rgba(192,132,252,0)_60%)]",
      },
      teal: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.5)_10%,_rgba(20,184,166,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(45,212,191,0.4)_10%,_rgba(45,212,191,0)_60%)]",
      },
      sunset: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.5)_10%,_rgba(234,88,12,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(251,146,60,0.4)_10%,_rgba(251,146,60,0)_60%)]",
      },
      cosmic: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(76,29,149,0.5)_10%,_rgba(76,29,149,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.4)_10%,_rgba(124,58,237,0)_70%)]",
      },
      neon: {
        primary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.5)_10%,_rgba(16,185,129,0)_60%)]",
        secondary:
          "bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.4)_10%,_rgba(250,204,21,0)_60%)]",
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
      </div>
    );
  }
);

Glow.displayName = "Glow";

export { Glow };
