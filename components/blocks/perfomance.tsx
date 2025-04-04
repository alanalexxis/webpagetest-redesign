"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Search,
  Zap,
  BarChart2,
  Shield,
  Smartphone,
  Chrome,
  Globe,
  Settings,
  Info,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import { ContainerTextFlip } from "../ui/text-flip";
import { BorderBeam } from "../magicui/border-beam";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";

const testTypes = [
  {
    name: "Site Performance",
    icon: <Zap className="h-5 w-5" />,
    description: "Analyze loading speed and performance metrics",
  },
  {
    name: "SEO Audit",
    icon: <BarChart2 className="h-5 w-5" />,
    description: "Check search engine optimization factors",
  },
  {
    name: "Security Check",
    icon: <Shield className="h-5 w-5" />,
    description: "Scan for vulnerabilities and security issues",
  },
  {
    name: "Mobile Friendly",
    icon: <Smartphone className="h-5 w-5" />,
    description: "Test responsiveness on mobile devices",
  },
];

const testConfigurations = [
  {
    id: "mobile-chrome-4g-us",
    device: "MOBILE",
    browser: "Chrome",
    browserIcon: <Chrome className="h-3 w-3" />,
    connection: "4G",
    location: "🇺🇸 Virginia, US",
    description: "Tests mobile experience with 4G connection speed",
  },
  {
    id: "desktop-chrome-cable-us",
    device: "DESKTOP",
    browser: "Chrome",
    browserIcon: <Chrome className="h-3 w-3" />,
    connection: "Cable",
    location: "🇺🇸 Virginia, US",
    description: "Tests desktop experience with high-speed connection",
  },
  {
    id: "mobile-chrome-3g-in",
    device: "MOBILE",
    browser: "Chrome",
    browserIcon: <Chrome className="h-3 w-3" />,
    connection: "3G",
    location: "🇮🇳 Mumbai, IN",
    description: "Tests mobile experience with slower connection in Asia",
  },
  {
    id: "desktop-edge-cable-ca",
    device: "DESKTOP",
    browser: "Edge",
    browserIcon: <Globe className="h-3 w-3" />,
    connection: "Cable",
    location: "🇨🇦 Toronto, CA",
    description: "Tests Edge browser experience in North America",
  },
  {
    id: "desktop-safari-cable-de",
    device: "DESKTOP",
    browser: "Safari",
    browserIcon: <Globe className="h-3 w-3" />,
    connection: "Cable",
    location: "🇩🇪 Frankfurt, DE",
    description: "Tests Safari browser experience in Europe",
  },
];

export default function SitePerformanceTester() {
  const [testType, setTestType] = useState(testTypes[0].name);
  const [url, setUrl] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedConfigId, setSelectedConfigId] = useState(
    testConfigurations[0].id
  );
  const [deviceFilter, setDeviceFilter] = useState("ALL");

  // Refs for scroll-based animations
  const componentRef = useRef(null);
  const scrollRef = useRef(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Use scroll progress for animations instead of IntersectionObserver
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start end", "end start"],
  });

  // Create smoother scroll progress using spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to animation progress values
  const headerOpacity = useTransform(smoothScrollProgress, [0.1, 0.2], [0, 1]);
  const formOpacity = useTransform(smoothScrollProgress, [0.15, 0.25], [0, 1]);
  const configOpacity = useTransform(smoothScrollProgress, [0.2, 0.3], [0, 1]);
  const filterOpacity = useTransform(
    smoothScrollProgress,
    [0.25, 0.35],
    [0, 1]
  );
  const gridOpacity = useTransform(smoothScrollProgress, [0.3, 0.4], [0, 1]);
  const advancedOpacity = useTransform(
    smoothScrollProgress,
    [0.35, 0.45],
    [0, 1]
  );
  const featuresOpacity = useTransform(
    smoothScrollProgress,
    [0.4, 0.5],
    [0, 1]
  );
  const footerOpacity = useTransform(
    smoothScrollProgress,
    [0.45, 0.55],
    [0, 1]
  );

  // Derived states for visibility
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Handle visibility based on scroll progress
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.1) {
        setIsVisible(true);
      }
    });

    // Handle mouse movements with RAF for better performance
    const handleMouseMove = (e) => {
      if (!throttleMouseMove.current) {
        throttleMouseMove.current = true;
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          throttleMouseMove.current = false;
        });
      }
    };

    const throttleMouseMove = { current: false };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      unsubscribe();
    };
  }, [scrollYProgress]);

  const handleSubmit = (e) => e.preventDefault();

  const getTestIcon = () => {
    const test = testTypes.find((t) => t.name === testType);
    return test?.icon;
  };

  const getTestDescription = () => {
    const test = testTypes.find((t) => t.name === testType);
    return test?.description;
  };

  const selectConfig = (configId) => {
    setSelectedConfigId(configId);
  };

  const filteredConfigurations =
    deviceFilter === "ALL"
      ? testConfigurations
      : testConfigurations.filter((config) => config.device === deviceFilter);

  // Animation variants with better performance settings
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Primero, actualiza las variantes de animación para tener un efecto más distintivo por elemento
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Incrementa el valor para mayor separación temporal
        delayChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={componentRef}
      className="bg-background flex flex-col items-center justify-center text-white relative overflow-hidden py-6 mt-64 "
      style={{
        willChange: "opacity, transform",
        perspective: "1000px",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Optimized cursor glow with lower intensity for better performance */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-70"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(101, 70, 235, 0.04), transparent 40%)`,
          willChange: "background",
          transform: "translateZ(0)",
        }}
      />

      {/* Background elements - optimized with hardware acceleration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-96 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/15 to-blue-600/15 blur-3xl"
          style={{ transform: "translateZ(0)" }}
        ></div>
      </div>
      <div
        className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] opacity-20"
        style={{ transform: "translateZ(0)" }}
      ></div>

      <div className="w-full max-w-6xl px-4 z-10">
        <div className="mx-auto">
          {/* Header - using motion values directly for smoother animations */}
          <motion.div
            style={{ opacity: headerOpacity }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              style={{ willChange: "transform, opacity" }}
              className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-blue-200 inline-flex items-center mb-3"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Instant website analysis
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <motion.h1
                variants={fadeIn}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                style={{ willChange: "transform, opacity" }}
              >
                Start a
              </motion.h1>

              <motion.h1
                variants={fadeIn}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white"
                style={{ willChange: "transform, opacity" }}
              >
                Test!
              </motion.h1>
              {isVisible && (
                <ContainerTextFlip
                  words={[
                    "now",
                    "today",
                    "quickly",
                    "instantly",
                    "successfully",
                    "effortlessly",
                    "like a pro",
                    "with confidence",
                    "with ease",
                    "in seconds",
                  ]}
                />
              )}
            </div>

            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mt-2 text-center text-white/60 text-sm max-w-xl"
              style={{ willChange: "transform, opacity" }}
            >
              {getTestDescription()}
            </motion.p>
          </motion.div>

          {/* Search form - using motion values for smoother scroll-based animation */}
          <motion.form
            style={{ opacity: formOpacity }}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Enter a website URL..."
                  className="w-full bg-[#0f172a]/80 backdrop-blur-md text-white px-6 py-3 text-base rounded-full h-auto border border-white/20 focus:ring-2 focus:ring-purple-500"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-10 w-10 rounded-full p-0 shadow-lg"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.form>

          {/* Test Configuration - using motion values for smooth animations */}
          <motion.div
            style={{ opacity: configOpacity }}
            className="mt-4 w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-1">Test Configuration</h3>
              <p className="text-xs text-white/60">
                Select the devices, browsers, and locations to test your website
                performance. Each configuration simulates different user
                environments to provide comprehensive results.
              </p>
            </div>

            {/* Device Selection */}
            <motion.div
              style={{ opacity: filterOpacity }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="text-xs font-medium">Filter by:</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 h-7 px-3 py-1 rounded-full text-xs ${
                    deviceFilter === "ALL"
                      ? "bg-purple-600/20 border-purple-500"
                      : "bg-white/5 border-white/10"
                  }`}
                  onClick={() => setDeviceFilter("ALL")}
                >
                  <span>All</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 h-7 px-3 py-1 rounded-full text-xs ${
                    deviceFilter === "MOBILE"
                      ? "bg-purple-600/20 border-purple-500"
                      : "bg-white/5 border-white/10"
                  }`}
                  onClick={() => setDeviceFilter("MOBILE")}
                >
                  <Smartphone className="h-3 w-3" />
                  <span>Mobile</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 h-7 px-3 py-1 rounded-full text-xs ${
                    deviceFilter === "DESKTOP"
                      ? "bg-purple-600/20 border-purple-500"
                      : "bg-white/5 border-white/10"
                  }`}
                  onClick={() => setDeviceFilter("DESKTOP")}
                >
                  <Settings className="h-3 w-3" />
                  <span>Desktop</span>
                </Button>
              </div>
            </motion.div>

            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-3 h-3"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-semibold">Simple Configuration</h3>
                <span className="text-xs text-white/60">
                  Select one test configuration
                </span>
              </div>

              {/* Card container with improved motion values for smoother animations */}
              <motion.div
                style={{ opacity: gridOpacity }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
                variants={staggerChildren}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                {filteredConfigurations.map((config) => (
                  <motion.div
                    key={config.id}
                    variants={fadeIn}
                    className={`flex flex-col gap-2 p-3 border border-white/10 rounded-lg ${
                      selectedConfigId === config.id
                        ? "bg-white/10 border-purple-500/50"
                        : "bg-white/5"
                    } cursor-pointer transition-all duration-200`}
                    onClick={() => selectConfig(config.id)}
                    style={{
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedConfigId === config.id
                              ? "bg-purple-500"
                              : "bg-white/20"
                          } flex items-center justify-center`}
                        >
                          {selectedConfigId === config.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="text-xs font-medium ml-1">
                          {config.device}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {config.browserIcon}
                        </div>
                        <span className="text-xs">{config.browser}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <div className="bg-green-800/80 rounded-md px-1.5 py-0.5 flex items-center gap-1">
                          <div className="flex items-end h-3">
                            <div className="w-0.5 h-1 bg-yellow-400 rounded-sm"></div>
                            <div className="w-0.5 h-1.5 bg-yellow-400 rounded-sm mx-0.5"></div>
                            <div className="w-0.5 h-2 bg-yellow-400 rounded-sm"></div>
                            <div className="w-0.5 h-2.5 bg-yellow-400 rounded-sm mx-0.5"></div>
                            <div className="w-0.5 h-3 bg-yellow-400 rounded-sm"></div>
                          </div>
                          <span>{config.connection}</span>
                        </div>
                      </span>
                      <span>{config.location}</span>
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      <Info className="h-3 w-3 inline mr-1" />
                      {config.description}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Additional Test Options with smoother animations */}
            <motion.div
              style={{ opacity: advancedOpacity }}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="carbon-control"
                  className="w-3 h-3 rounded border-white/20 bg-white/5"
                />
                <label htmlFor="carbon-control" className="text-xs font-medium">
                  Run Carbon Control
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="repeat-view"
                  className="w-3 h-3 rounded border-white/20 bg-white/5"
                />
                <label htmlFor="repeat-view" className="text-xs font-medium">
                  Include Repeat View
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lighthouse-audit"
                  className="w-3 h-3 rounded border-white/20 bg-white/5"
                />
                <label
                  htmlFor="lighthouse-audit"
                  className="text-xs font-medium"
                >
                  Run Lighthouse Audit
                </label>
              </div>
            </motion.div>

            {/* Advanced Configuration */}
            <motion.div
              style={{ opacity: advancedOpacity }}
              className="mt-3"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold">
                  Advanced Configuration
                </h3>
                <span className="text-xs text-white/60">
                  Choose from all browser, location, & device options
                </span>
              </div>
            </motion.div>

            {/* Start Test Button */}
            <motion.div
              style={{ opacity: advancedOpacity }}
              className="mt-3 flex justify-end"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1 h-auto rounded-xl text-sm">
                Start Test →
              </Button>
            </motion.div>
          </motion.div>

          {/* Features grid with scroll-based animations */}
          <motion.div
            style={{ opacity: featuresOpacity }}
            className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {testTypes.map((type) => (
              <motion.div
                key={type.name}
                variants={scaleIn}
                className={`p-3 rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-200
                  ${
                    testType === type.name
                      ? "bg-white/10 border-purple-500/50 shadow-lg shadow-purple-500/10"
                      : "bg-white/5 border-white/10 hover:bg-white/8"
                  }`}
                onClick={() => setTestType(type.name)}
                style={{
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-2 border border-white/10">
                  {type.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1">{type.name}</h3>
                <p className="text-xs text-white/60">{type.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{ opacity: footerOpacity }}
            className="mt-4 text-center"
            variants={fadeIn}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {isVisible && (
              <AnimatedGradientText>
                <span
                  className={cn(
                    `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Powered by advanced analytics
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
