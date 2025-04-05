"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/blocks/hero-section";
import { Icons } from "@/components/ui/icons";

export function HeroSectionDemo() {
  // Define the different content variations
  const contentVariations = [
    {
      title: "Introducing",
      highlight: "Carbon Control",
      color: "purple",
      imageSrc: "/1.jpg", // Changed to local path
      description:
        "New in WebPageTest! Measure your site's carbon footprint and run No-Code Experiments to find ways to improve.",
    },

    {
      title: "Live Internet",
      highlight: "Outages Map",
      color: "teal",
      imageSrc: "/2.jpg", // Changed to local path
      description:
        "Gain visibility into internet outages and pinpoint the root cause of poor web performance.",
    },
    {
      title: "Lightning-Fast",
      highlight: "Web Performance",
      color: "sunset",
      imageSrc: "/3.jpg", // Changed to local path
      description:
        "Learn to analyze performance, fix issues, and deliver fast websites from the start.",
    },
  ];

  // State to track current content variation
  const [currentIndex, setCurrentIndex] = useState(0);

  // Key to force component remount and trigger animations
  const [remountKey, setRemountKey] = useState(0);

  // Effect to change content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update to next content index
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % contentVariations.length
      );
      // Increment key to force remount
      setRemountKey((key) => key + 1);
    }, 7000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Get current content
  const currentContent = contentVariations[currentIndex];

  return (
    <div key={remountKey}>
      <HeroSection
        badge={{
          text: "Introducing our new components",
          action: {
            text: "Learn more",
            href: "/docs",
          },
        }}
        title={currentContent.title}
        highlight={currentContent.highlight}
        description={currentContent.description}
        color={currentContent.color}
        imageSrc={currentContent.imageSrc}
        actions={[
          {
            text: "Get Started",
            href: "/docs/getting-started",
            variant: "default",
          },
          {
            text: "GitHub",
            href: "https://github.com/your-repo",
            variant: "glow",
            icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
      />
    </div>
  );
}
