import type React from "react";
import { Box, Lock, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "../ui/glowing-effect";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px]  p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-slate-300">
                {description}
              </h2>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-violet-600/15 to-fuchsia-600/15 blur-3xl"
          style={{ transform: "translateZ(0)" }}
        ></div>
      </div>
    </li>
  );
};

export function GlowingEffectDemo() {
  return (
    <div className="flex justify-center w-full py-8">
      <ul className="grid grid-cols-1 gap-4 max-w-5xl w-[90%] md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem]">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
          icon={<Box className="h-4 w-4" />}
          title="Real Experience"
          description="Test your user's real experience with global locations, modern devices, and the latest browser versions."
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]"
          icon={<Settings className="h-4 w-4" />}
          title="Video Capture"
          description="Correlate your user's visual experience to the technical measurements of your site."
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]"
          icon={<Lock className="h-4 w-4" />}
          title="In-Depth Metrics"
          description="Dive into the anatomy of your webpage with components like DNS, TCP, TLS, and more."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]"
          icon={<Search className="h-4 w-4" />}
          title="Performance Analysis"
          description="Identify bottlenecks and optimize your application with comprehensive performance insights."
        />
      </ul>
    </div>
  );
}
