import { Hexagon, Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { Footer } from "@/components/ui/footer";

function FooterD() {
  return (
    <div className="w-full">
      <Footer
        brandName="Data-Driven Content Studio"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
          {
            icon: <Youtube className="h-5 w-5" />,
            href: "https://youtube.com",
            label: "YouTube",
          },
          {
            icon: <Linkedin className="h-5 w-5" />,
            href: "https://Linkedin.com",
            label: "YouTube",
          },
        ]}
        mainLinks={[
          { href: "/test", label: "Test history" },
          { href: "/solution", label: "Solutions" },
          { href: "/pricing", label: "Pricing" },
          { href: "/resources", label: "Resources" },
          { href: "/about", label: "About" },
        ]}
        legalLinks={[
          { href: "/contact", label: "Contact Sales" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/privacy", label: "Privacy Policy" },
        ]}
        copyright={{
          text: "© 2025 Data-Driven Content Studio",
          license: "All rights reserved",
        }}
      />
    </div>
  );
}

export { FooterD };
