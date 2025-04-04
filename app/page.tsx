import { FooterD } from "@/components/blocks/footer";
import { GlowingEffectDemo } from "@/components/blocks/glow-card";
import { MarqueeDemo } from "@/components/blocks/marquee";
import SitePerformanceTester from "@/components/blocks/perfomance";
import { Quote } from "@/components/blocks/quote";

import { NavbarDemo } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="w-full">
        <NavbarDemo />
      </div>
      <div className="w-full md:mt-96 sm:mt-0">
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
    </div>
  );
}
