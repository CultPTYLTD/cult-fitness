import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Workouts", href: "/workouts" },
    { name: "Programs", href: "/programs" },
    { name: "Nutrition", href: "/nutrition" },
    { name: "Community", href: "/community" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="inline-block mb-6">
              <span className="text-xl font-serif tracking-wide text-background uppercase">
                Cult Fitness
              </span>
            </Link>
            <p className="text-background/60 text-sm mb-8 max-w-xs leading-relaxed">
              Mindful movement and curated workouts for the modern woman.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-background/60">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-background/60">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-background/60">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Cult Fitness. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              to="/privacy"
              className="text-background/40 hover:text-background/60 transition-colors text-xs uppercase tracking-widest"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-background/40 hover:text-background/60 transition-colors text-xs uppercase tracking-widest"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}