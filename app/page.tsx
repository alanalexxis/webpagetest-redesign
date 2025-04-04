import { HeroSectionDemo } from "@/components/blocks/demo";
import { FooterD } from "@/components/blocks/footer";
import { GlowingEffectDemo } from "@/components/blocks/glow-card";
import { MarqueeDemo } from "@/components/blocks/marquee";
import SitePerformanceTester from "@/components/blocks/perfomance";
import { Quote } from "@/components/blocks/quote";

import { NavbarDemo } from "@/components/navbar";
import { Particles } from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="w-full">
        <NavbarDemo />
      </div>
      <div>
        <HeroSectionDemo />
      </div>
      <div className="w-full md:mt-96 ">
        <SitePerformanceTester />
      </div>
      <div className="w-full mt-20">
        <MarqueeDemo />
      </div>
      <div className="w-full mt-28">
        <Quote />
      </div>

      <div className="w-full -mt-10">
        <GlowingEffectDemo />
      </div>
      <div className="w-full -mt-10">
        <FooterD />
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        refresh
      />
    </div>
  );
}
