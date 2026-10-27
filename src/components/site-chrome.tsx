import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/mark.png.asset.json";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/content/social-links";

const nav = [
  { to: "/courses", label: "Courses" },
  { to: "/learning-paths", label: "Learning Paths" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
] as const;

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src={logo.url} alt="" className="h-10 w-auto" />
      <span className="leading-tight">
        <span className="block font-display text-base font-bold tracking-tight">SANIDHYA</span>
        <span className="block text-[11px] text-muted-foreground">School of Coding</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const openedAtScrollY = window.scrollY;
    const closeOnScroll = () => {
      if (Math.abs(window.scrollY - openedAtScrollY) >= 8) setOpen(false);
    };
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [open]);

  const mobileNav = [{ to: "/", label: "Home" }, ...nav, { to: "/contact", label: "Contact" }] as const;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <div className="min-w-0">
          <Brand />
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="hero">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
        <button
          className="shrink-0 p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="border-t px-5 py-3 md:hidden">
          {mobileNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-medium"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-span-2 lg:col-span-2">
          <Link
            to="/"
            aria-label="Sanidhya School of Coding home"
            className="inline-flex overflow-hidden rounded-2xl border bg-white shadow-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img src="/ssc-logo.png" alt="" className="h-28 w-28 object-contain sm:h-32 sm:w-32" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Build, not just study. Practice, not just theory. Create, not just memorize.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/learning-paths">Learning Paths</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Sanidhya</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Connect</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {socialLinks.map(({ label, href, icon: SocialIcon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <SocialIcon className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sanidhya School of Coding · Learn. Build. Create.
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-soft">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      </div>
    </section>
  );
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
      {level}
    </span>
  );
}
