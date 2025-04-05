"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/blocks/hero-section";
import { Icons } from "@/components/ui/icons";

export function HeroSectionDemo() {
  const contentVariations = [
    {
      title: "Introducing",
      highlight: "Carbon Control",
      color: "purple",
      imageSrc: "/1.jpg",
      description:
        "New in WebPageTest! Measure your site's carbon footprint and run No-Code Experiments to find ways to improve.",
      badgeText: "Track your website's carbon impact",
    },
    {
      title: "Live Internet",
      highlight: "Outages Map",
      color: "teal",
      imageSrc: "/2.jpg",
      description:
        "Gain visibility into internet outages and pinpoint the root cause of poor web performance.",
      badgeText: "Stay ahead with real-time insights",
    },
    {
      title: "Lightning-Fast",
      highlight: "Web Performance",
      color: "sunset",
      imageSrc: "/3.jpg",
      description:
        "Learn to analyze performance, fix issues, and deliver fast websites from the start.",
      badgeText: "Speed up your website experience",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % contentVariations.length
      );
      setRemountKey((key) => key + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentContent = contentVariations[currentIndex];

  return (
    <div key={remountKey}>
      <HeroSection
        badge={{
          text: currentContent.badgeText,
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
