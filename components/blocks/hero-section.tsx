"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";
import { GradientText } from "../ui/gradient-text";
import { BackgroundLines } from "../ui/background-lines";
import { BorderBeam } from "../magicui/border-beam";
import { Safari } from "../magicui/safari";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  highlight: string;
  color: string;
  imageSrc: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  highlight,
  description,
  actions,
  color,
  imageSrc,
}: HeroProps) {
  return (
    <BackgroundLines>
      <section
        className={cn(
          " text-foreground",
          "py-12 sm:py-24 md:py-32 px-4",
          "fade-bottom overflow-hidden pb-0"
        )}
      >
        <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24 bg-background">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
            {/* Badge */}
            {badge && (
              <Badge variant="outline" className="animate-appear gap-2">
                <span className="text-muted-foreground">{badge.text}</span>
                <a href={badge.action.href} className="flex items-center gap-1">
                  {badge.action.text}
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              </Badge>
            )}

            {/* Title */}
            <h1 className="relative z-10 inline-block animate-appear bg-clip-text text-4xl font-semibold leading-tight drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
              {title} <GradientText>{highlight}</GradientText>
            </h1>

            {/* Description */}
            <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
              {description}
            </p>

            {/* Actions */}
            <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
              <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    size="lg"
                    asChild
                  >
                    <a href={action.href} className="flex items-center gap-2">
                      {action.icon}
                      {action.text}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Image with Glow */}
            <div className="relative pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup type="responsive">
                  <Safari
                    url="https://www.webpagetest.org/"
                    className="size-full"
                    mode="simple"
                    imageSrc={imageSrc}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-background to-transparent"></div>
                  <BorderBeam duration={8} size={200} />
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000  "
                colorScheme={color}
                intensity="medium"
                animated={true}
              />
            </div>
          </div>
        </div>
      </section>
    </BackgroundLines>
  );
}
