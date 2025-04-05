"use client";

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";

// ListItem component for navigation dropdowns
const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    solutions: false,
    team: false,
    useCase: false,
    special: false,
  });

  // Add hover state for navbar items
  const [hovered, setHovered] = useState(null);

  // Define dropdown items for Solutions menu
  const solutionsItems = [
    {
      title: "Opportunities & Experiments",
      href: "/opportunities",
      description: "Explore testing opportunities and run experiments.",
    },
    {
      title: "API",
      href: "/api",
      description: "Access our robust API for integration.",
    },
    {
      title: "Carbon Control (NEW)",
      href: "/carbon-control",
      description: "Monitor and optimize carbon footprint.",
    },
  ];

  // Team section items
  const teamItems = [
    {
      title: "Web/SEO Teams",
      href: "/web-seo-teams",
      description: "Solutions for web and SEO professionals.",
    },
    {
      title: "IT/DevOps Teams",
      href: "/it-devops-teams",
      description: "Tools for IT and DevOps professionals.",
    },
  ];

  // Use case items
  const useCaseItems = [
    {
      title: "Real User Monitoring (RUM)",
      href: "/rum",
      description: "Monitor real user experiences and performance.",
    },
    {
      title: "API Monitoring",
      href: "/api-monitoring",
      description: "Track API performance and availability.",
    },
    {
      title: "DNS Monitoring",
      href: "/dns-monitoring",
      description: "Monitor DNS health and performance.",
    },
    {
      title: "BGP Monitoring",
      href: "/bgp-monitoring",
      description: "Track BGP routing and networking issues.",
    },
    {
      title: "CDN Monitoring",
      href: "/cdn-monitoring",
      description: "Monitor content delivery network performance.",
    },
    {
      title: "Website Performance Monitoring",
      href: "/website-monitoring",
      description: "Track and optimize website performance.",
    },
  ];

  // Special features
  const specialFeatures = [
    {
      title: "Live Internet Outages Map (NEW)",
      href: "/outages-map",
      description: "View live internet outages across the globe.",
    },
    {
      title: "See Outages Affecting Your Sites",
      href: "/your-outages",
      description: "Get personalized outage alerts for your websites.",
    },
    {
      title: "Internet Performance Monitoring",
      href: "/enterprise",
      description: "Enterprise-grade internet performance monitoring solution.",
    },
  ];

  // Define nav items - unified structure
  const navItems = [
    {
      name: "Test History",
      link: "#test-history",
      content: null, // No dropdown content
    },
    {
      name: "Solutions",
      link: "#",
      content: (
        <div className="grid w-[800px] grid-cols-2 gap-4 p-4">
          {/* Main features */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground">
              Main Features
            </h4>
            <ul className="grid gap-3">
              {solutionsItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>

            {/* Special features section */}
            <div className="space-y-4 pt-4 border-t">
              {specialFeatures.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium">{feature.title}</h4>
                  <Link href={feature.href} legacyBehavior passHref>
                    <a className="block text-sm text-muted-foreground hover:text-primary">
                      {index === 0 ? "See Outages Affecting Your Sites" : null}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Categories section */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">
                By Team
              </h4>
              <ul className="mt-2 space-y-2">
                {teamItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground">
                By Use Case
              </h4>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {useCaseItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Pricing",
      link: "#pricing",
      content: null, // No dropdown content
    },
  ];

  // Toggle submenu state
  const toggleSubMenu = (menu) => {
    setIsSubMenuOpen({
      ...isSubMenuOpen,
      [menu]: !isSubMenuOpen[menu],
    });
  };

  // Reset all submenus
  const resetSubMenus = () => {
    setIsSubMenuOpen({
      solutions: false,
      team: false,
      useCase: false,
      special: false,
    });
  };

  // Close mobile menu and reset submenus
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    resetSubMenus();
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />

          <div className="flex items-center space-x-4">
            {/* Unified NavItems rendering */}
            <div
              className="flex items-center space-x-2"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item, idx) => (
                <NavigationMenu key={`nav-${idx}`} className="-left-4">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {item.content ? (
                        // Items with dropdown content
                        <div className="relative">
                          <NavigationMenuTrigger
                            className="text-sm flex items-center h-full px-4 py-2 text-neutral-600 dark:text-neutral-300 relative"
                            onMouseEnter={() => setHovered(idx)}
                          >
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            {item.content}
                          </NavigationMenuContent>
                          {hovered === idx && (
                            <motion.div
                              layoutId="hovered"
                              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800 -z-10"
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 30,
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        // Items without dropdown content
                        <div className="relative">
                          <a
                            href={item.link}
                            className="text-sm flex items-center h-full px-4 py-2 text-neutral-600 dark:text-neutral-300 relative"
                            onMouseEnter={() => setHovered(idx)}
                          >
                            {item.name}
                          </a>
                          {hovered === idx && (
                            <motion.div
                              layoutId="hovered"
                              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800 -z-10"
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 30,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Start Test</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            className="overflow-auto"
          >
            {/* Unified mobile nav items rendering */}
            <div className="space-y-1">
              {navItems.map((item, idx) => (
                <React.Fragment key={`mobile-item-${idx}`}>
                  {item.content ? (
                    // Items with dropdown content (Solutions)
                    <div className="mb-4">
                      <button
                        className="flex w-full items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                        onClick={() => toggleSubMenu("solutions")}
                        aria-expanded={isSubMenuOpen.solutions}
                      >
                        <h3 className="text-base font-medium">{item.name}</h3>
                        {isSubMenuOpen.solutions ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {isSubMenuOpen.solutions && (
                        <div className="mt-1 ml-3 pl-2 border-l border-gray-200 dark:border-gray-700 space-y-4">
                          {/* Main Features */}
                          <div className="space-y-1">
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground pt-2">
                              Main Features
                            </h4>
                            <div className="space-y-1">
                              {solutionsItems.map((solution, sIdx) => (
                                <a
                                  key={`mobile-solution-${sIdx}`}
                                  href={solution.href}
                                  onClick={closeMobileMenu}
                                  className="block py-2 px-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                  {solution.title}
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* By Team section */}
                          <div>
                            <button
                              className="flex w-full items-center justify-between py-1 text-xs uppercase tracking-wider text-muted-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubMenu("team");
                              }}
                              aria-expanded={isSubMenuOpen.team}
                            >
                              <span>By Team</span>
                              {isSubMenuOpen.team ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>

                            {isSubMenuOpen.team && (
                              <div className="mt-1 space-y-1">
                                {teamItems.map((item, idx) => (
                                  <a
                                    key={`mobile-team-${idx}`}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className="block py-2 px-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  >
                                    {item.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* By Use Case section */}
                          <div>
                            <button
                              className="flex w-full items-center justify-between py-1 text-xs uppercase tracking-wider text-muted-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubMenu("useCase");
                              }}
                              aria-expanded={isSubMenuOpen.useCase}
                            >
                              <span>By Use Case</span>
                              {isSubMenuOpen.useCase ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>

                            {isSubMenuOpen.useCase && (
                              <div className="mt-1 space-y-1">
                                {useCaseItems.map((item, idx) => (
                                  <a
                                    key={`mobile-usecase-${idx}`}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className="block py-2 px-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  >
                                    {item.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Special Features section */}
                          <div>
                            <button
                              className="flex w-full items-center justify-between py-1 text-xs uppercase tracking-wider text-muted-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubMenu("special");
                              }}
                              aria-expanded={isSubMenuOpen.special}
                            >
                              <span>Special Features</span>
                              {isSubMenuOpen.special ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>

                            {isSubMenuOpen.special && (
                              <div className="mt-1 space-y-1">
                                {specialFeatures.map((feature, idx) => (
                                  <a
                                    key={`mobile-special-${idx}`}
                                    href={feature.href}
                                    onClick={closeMobileMenu}
                                    className="block py-2 px-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  >
                                    <span className="font-medium block">
                                      {feature.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {feature.description}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Items without dropdown in mobile view
                    <a
                      href={item.link}
                      onClick={closeMobileMenu}
                      className="flex w-full items-center py-2 px-3 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>{item.name}</span>
                    </a>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex w-full flex-col gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <NavbarButton
                onClick={closeMobileMenu}
                variant="secondary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={closeMobileMenu}
                variant="primary"
                className="w-full"
              >
                Start Test
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
