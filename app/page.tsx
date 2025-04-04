import { MarqueeDemo } from "@/components/blocks/marquee";
import SitePerformanceTester from "@/components/blocks/perfomance";
import { NavbarDemo } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="w-full">
        <NavbarDemo />
      </div>
      <div className="w-full md:mt-96 sm:mt-0">
        <SitePerformanceTester />
      </div>
    </div>
  );
}
