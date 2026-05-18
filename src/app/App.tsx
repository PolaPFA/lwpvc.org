import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import lwpLogo from "@/imports/LWPDraw.png";
import {
  Scissors,
  Monitor,
  BookOpen,
  Palette,
  Mic,
  Cpu,
  Heart,
  Users,
  Sprout,
  ShieldCheck,
  TrendingUp,
  Globe,
  Star,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// ─── Vine SVG Divider ────────────────────────────────────────────────────────
function VineDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: 48 }}
      >
        <path
          d="M0 24 Q100 8 200 24 Q300 40 400 24 Q500 8 600 24 Q700 40 800 24 Q900 8 1000 24 Q1100 40 1200 24"
          stroke="#1E8E43"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          fill="none"
        />
        <circle cx="200" cy="24" r="3.5" fill="#1E8E43" fillOpacity="0.18" />
        <circle cx="400" cy="24" r="3.5" fill="#1E8E43" fillOpacity="0.18" />
        <circle cx="600" cy="24" r="3.5" fill="#1E8E43" fillOpacity="0.18" />
        <circle cx="800" cy="24" r="3.5" fill="#1E8E43" fillOpacity="0.18" />
        <circle cx="1000" cy="24" r="3.5" fill="#1E8E43" fillOpacity="0.18" />
        {[150, 350, 550, 750, 950].map((x) => (
          <path
            key={x}
            d={`M${x} 20 Q${x + 6} 12 ${x + 14} 16`}
            stroke="#1E8E43"
            strokeWidth="1"
            strokeOpacity="0.2"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Leaf Accent ─────────────────────────────────────────────────────────────
function LeafAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 24 C8 24 10 8 24 8 C24 8 22 22 8 24Z"
        fill="#1E8E43"
        fillOpacity="0.18"
      />
      <path
        d="M8 24 L18 14"
        stroke="#1E8E43"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  label,
}: {
  target: string;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const numericTarget = parseInt(target.replace(/\D/g, ""), 10) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || numericTarget === 0) return;
    const duration = 1800;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, numericTarget]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-bold mb-1"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          color: "#ffffff",
          lineHeight: 1,
        }}
      >
        {prefix}
        {numericTarget > 0 ? count : "∞"}
        {suffix}
      </div>
      <div
        className="text-sm font-medium uppercase tracking-widest"
        style={{ color: "#1E8E43" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Impact", href: "#impact" },
  { label: "Partner", href: "#partner" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(248,246,241,0.97)" : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(75,30,15,0.08)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center group"
          aria-label="Life with Purpose - go to top"
        >
          <ImageWithFallback
            src={lwpLogo}
            alt="Life with Purpose logo"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium transition-colors duration-150"
              style={{
                color: "#4B1E0F",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#1E8E43")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#4B1E0F")
              }
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#sponsor")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: "#1E8E43",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "#166b32")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "#1E8E43")
            }
          >
            Donate
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={22} color="#4B1E0F" />
          ) : (
            <Menu size={22} color="#4B1E0F" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            background: "#F8F6F1",
            borderColor: "rgba(75,30,15,0.1)",
          }}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left py-2.5 text-sm font-medium"
                style={{ color: "#4B1E0F", fontFamily: "'DM Sans', sans-serif" }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#sponsor")}
              className="mt-3 py-3 rounded-full text-sm font-semibold text-center"
              style={{ background: "#1E8E43", color: "#fff" }}
            >
              Donate Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551356522-1de5dc9c2c08?w=1600&h=900&fit=crop&auto=format"
          alt="Students learning vocational skills in Uganda"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(75,30,15,0.88) 0%, rgba(75,30,15,0.45) 55%, rgba(75,30,15,0.1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-32 w-full">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: "rgba(30,142,67,0.25)", border: "1px solid rgba(30,142,67,0.45)" }}
          >
            <Sprout size={13} color="#86efac" />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#86efac" }}
            >
              Uganda Vocational Center
            </span>
          </div>

          <h1
            className="mb-6 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Empowering Uganda's Youth
            <br />
            <em style={{ color: "#D9A441", fontStyle: "italic" }}>
              with Skills for Life
            </em>
          </h1>

          <p
            className="mb-10 max-w-xl leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Through hands-on vocational training, Life with Purpose Vocational
            Center equips young men and women with practical skills,
            entrepreneurial knowledge, and spiritual guidance to break the cycle
            of poverty and build sustainable futures.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#sponsor")}
              className="px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200"
              style={{
                background: "#1E8E43",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.background = "#166b32")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.background = "#1E8E43")
              }
            >
              Support Us, Support Them
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200 flex items-center gap-2"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.12)";
              }}
            >
              Our Story <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Impact stats bar */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {[
            { value: "500+", label: "Youth to Be Trained" },
            { value: "10+", label: "Marketable Skills" },
            { value: "1", label: "Mission: Transform Lives" },
            { value: "∞", label: "Opportunities Created" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "#D9A441",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-xs uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24" style={{ background: "#fff" }}>
      <VineDivider />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/5", background: "#EAF6EE" }}
            >
              <img
                src="https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=700&h=875&fit=crop&auto=format"
                alt="Teacher working with students in Uganda"
                className="w-full h-full object-cover"
              />
            </div>
            {/* floating badge */}
            <div
              className="absolute -bottom-6 -right-4 rounded-2xl px-6 py-5 shadow-xl"
              style={{ background: "#D9A441" }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                2024
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Center Founded
              </div>
            </div>
            {/* leaf decoration */}
            <LeafAccent className="absolute -top-4 -left-4 w-16 h-16 opacity-60" />
          </div>

          {/* Text */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
            >
              About the Center
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#4B1E0F",
                lineHeight: 1.2,
              }}
            >
              Transforming Potential
              <br />
              <em style={{ fontStyle: "italic", color: "#1E8E43" }}>
                into Purpose
              </em>
            </h2>
            <div
              className="space-y-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#5a3020",
              }}
            >
              <p>
                Life with Purpose Vocational Center is a life-changing initiative
                in Uganda dedicated to equipping disadvantaged youth and women
                with practical vocational skills, entrepreneurship training, and
                spiritual mentorship.
              </p>
              <p>
                Many young people in Uganda are unable to continue formal
                education due to poverty and limited opportunities. Our center
                provides a pathway to dignity, self-reliance, and hope — through
                hands-on instruction, mentorship, and character development.
              </p>
              <p>
                Students are empowered to secure employment, launch small
                businesses, and become agents of transformation in their families
                and communities.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t" style={{ borderColor: "rgba(75,30,15,0.1)" }}>
              <h3
                className="mb-3 font-semibold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  color: "#4B1E0F",
                }}
              >
                Our Mission
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "#5a3020",
                }}
              >
                We believe every individual has God-given potential. Our mission
                is to provide vocational education and holistic development that
                enables youth and women to build sustainable livelihoods,
                overcome poverty, and create brighter futures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why It Matters ───────────────────────────────────────────────────────────
const whyCards = [
  { icon: <Scissors size={22} />, title: "Practical Skills for Employment" },
  { icon: <TrendingUp size={22} />, title: "Entrepreneurship & Business Development" },
  { icon: <Users size={22} />, title: "Women Empowerment" },
  { icon: <Star size={22} />, title: "Youth Leadership" },
  { icon: <ShieldCheck size={22} />, title: "Financial Independence" },
  { icon: <Globe size={22} />, title: "Community Transformation" },
  { icon: <Heart size={22} />, title: "Restored Dignity and Hope" },
  { icon: <Sprout size={22} />, title: "Spiritual & Character Formation" },
];

function WhyItMatters() {
  return (
    <section
      id="why"
      className="py-24"
      style={{ background: "#F3EBDD" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
          >
            Why It Matters
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#4B1E0F",
            }}
          >
            Education That Leads to Independence
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {whyCards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all duration-200 group cursor-default"
              style={{ background: "#fff" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 32px rgba(75,30,15,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#EAF6EE", color: "#1E8E43" }}
              >
                {card.icon}
              </div>
              <div
                className="font-semibold leading-snug"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "#4B1E0F",
                }}
              >
                {card.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Training Programs ────────────────────────────────────────────────────────
const programs = [
  {
    icon: <Scissors size={24} />,
    title: "Tailoring & Fashion Design",
    desc: "Learn professional sewing, pattern-making, and fashion entrepreneurship to launch your own clothing business.",
  },
  {
    icon: <Monitor size={24} />,
    title: "Computer & Digital Skills",
    desc: "Master essential computer literacy, office productivity, and digital tools for today's employment market.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "English Language",
    desc: "Build fluency and professional communication skills that unlock education and employment opportunities.",
  },
  {
    icon: <Palette size={24} />,
    title: "Graphic Design & Media",
    desc: "Create compelling visuals for businesses, NGOs, and social media using industry-standard design tools.",
  },
  {
    icon: <Mic size={24} />,
    title: "Public Speaking & Presentation",
    desc: "Develop confidence, clarity, and leadership presence through practical speaking and persuasion training.",
  },
  {
    icon: <Cpu size={24} />,
    title: "AI Applications in Real Life",
    desc: "Understand and apply artificial intelligence tools to enhance productivity, creativity, and entrepreneurship.",
  },
];

function Programs() {
  return (
    <section id="programs" className="py-24" style={{ background: "#EAF6EE" }}>
      <VineDivider />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
          >
            Training Programs
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#4B1E0F",
            }}
          >
            Skills That Open Doors
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 transition-all duration-200"
              style={{ background: "#fff" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 16px 40px rgba(30,142,67,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "#EAF6EE", color: "#1E8E43" }}
              >
                {p.icon}
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#4B1E0F",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "#8B5E3C",
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Holistic Development ─────────────────────────────────────────────────────
function HolisticDevelopment() {
  return (
    <section className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
            >
              Holistic Development
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 700,
                color: "#4B1E0F",
                lineHeight: 1.25,
              }}
            >
              More Than
              <br />
              <em style={{ color: "#1E8E43", fontStyle: "italic" }}>
                Skills Training
              </em>
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#5a3020",
              }}
            >
              Our students receive far more than technical education. We provide
              entrepreneurship coaching, life skills training, mentorship, and
              leadership development to help each individual grow in confidence,
              integrity, and purpose.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Entrepreneurship Coaching",
                "Life Skills Training",
                "Mentorship Programs",
                "Leadership Development",
                "Spiritual Formation",
                "Financial Literacy",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div
                    className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "#EAF6EE" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#1E8E43" }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      color: "#4B1E0F",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4", background: "#EAF6EE" }}
            >
              <img
                src="https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=400&h=530&fit=crop&auto=format"
                alt="Students in group learning session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="rounded-2xl overflow-hidden flex-1"
                style={{ background: "#F3EBDD" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=400&h=260&fit=crop&auto=format"
                  alt="Children learning in classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="rounded-2xl p-5"
                style={{ background: "#D9A441" }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  100%
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Holistic approach to every student
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Student Journey ──────────────────────────────────────────────────────────
const journeySteps = [
  { num: "01", title: "Student Identification & Enrollment", desc: "Community outreach identifies youth most in need of vocational support." },
  { num: "02", title: "Orientation & Goal Setting", desc: "Students are welcomed and guided to set personal and professional goals." },
  { num: "03", title: "Hands-On Skills Training", desc: "Intensive practical instruction in chosen vocational programs." },
  { num: "04", title: "Mentorship & Internship Opportunities", desc: "Real-world experience with local businesses and community organizations." },
  { num: "05", title: "Graduation & Certification", desc: "Students receive recognized certificates marking their achievement." },
  { num: "06", title: "Startup Support & Tool Kits", desc: "Graduates receive tools and startup resources to begin their careers." },
  { num: "07", title: "Employment or Business Launch", desc: "Alumni enter the workforce or launch their own income-generating enterprises." },
];

function StudentJourney() {
  return (
    <section className="py-24" style={{ background: "#F8F6F1" }}>
      <VineDivider flip />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
          >
            The Student Journey
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#4B1E0F",
            }}
          >
            From Potential to Profession
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background: "linear-gradient(to bottom, transparent, #1E8E43 10%, #1E8E43 90%, transparent)",
              opacity: 0.2,
              transform: "translateX(-50%)",
            }}
          />

          <div className="space-y-8">
            {journeySteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0
                    ? "md:flex-row md:text-left"
                    : "md:flex-row-reverse md:text-right"
                }`}
              >
                {/* Content */}
                <div
                  className="flex-1 md:px-10"
                  style={{ maxWidth: "calc(50% - 2rem)" }}
                >
                  <div
                    className="hidden md:block rounded-2xl p-6 transition-all duration-200"
                    style={{ background: "#fff" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 24px rgba(75,30,15,0.09)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="font-bold mb-1"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: "#1E8E43",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Step {step.num}
                    </div>
                    <h3
                      className="font-bold mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1rem",
                        color: "#4B1E0F",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#8B5E3C",
                        lineHeight: 1.65,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Step dot — desktop */}
                <div className="hidden md:flex w-16 flex-shrink-0 justify-center items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs z-10"
                    style={{
                      background: "#1E8E43",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Empty half — desktop */}
                <div className="flex-1 hidden md:block" />

                {/* Mobile layout */}
                <div
                  className="md:hidden flex-1 rounded-2xl p-5"
                  style={{ background: "#fff" }}
                >
                  <div
                    className="font-bold mb-1 text-xs uppercase tracking-wider"
                    style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Step {step.num}
                  </div>
                  <h3
                    className="font-bold mb-1.5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      color: "#4B1E0F",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.86rem",
                      color: "#8B5E3C",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Impact Section ───────────────────────────────────────────────────────────
function Impact() {
  return (
    <section id="impact" className="py-24" style={{ background: "#4B1E0F" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#D9A441", fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Impact
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.25,
              }}
            >
              Transforming Lives,
              <br />
              <em style={{ color: "#D9A441", fontStyle: "italic" }}>
                Families, and Communities
              </em>
            </h2>
            <p
              className="mb-10"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Every graduate represents a family lifted toward financial
              stability and a community strengthened through economic opportunity.
              By investing in vocational education, donors help create lasting
              change that multiplies for generations.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { target: "85", suffix: "%", label: "Increased Household Income" },
                { target: "120", suffix: "+", label: "New Small Businesses" },
                { target: "400", suffix: "+", label: "Jobs Created" },
                { target: "50", suffix: "+", label: "Communities Reached" },
              ].map((stat) => (
                null
              ))}
            </div>
          </div>

          {/* Photo */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3", background: "#5a3020" }}
          >
            <img
              src="https://images.unsplash.com/photo-1543180920-667698c042cd?w=700&h=525&fit=crop&auto=format"
              alt="Group of youth students standing together proudly"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.9) saturate(1.1)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Amara Nakato",
    program: "Tailoring & Fashion Design",
    quote:
      "Before this program, I had no income and no hope. Today I run my own tailoring shop in Kampala and employ two women from my community. This center gave me my dignity back.",
    initials: "AN",
    color: "#1E8E43",
  },
  {
    name: "David Ssekamwa",
    program: "Computer & Digital Skills",
    quote:
      "I graduated with digital skills and was immediately hired by a local NGO to manage their communications. My salary now supports my entire family. I never imagined this was possible.",
    initials: "DS",
    color: "#D9A441",
  },
  {
    name: "Grace Akello",
    program: "Graphic Design & Media",
    quote:
      "I use the design skills I learned here to serve local churches and small businesses. I have a thriving freelance practice and I mentor other young women to follow the same path.",
    initials: "GA",
    color: "#4B1E0F",
  },
];

function Testimonials() {
  return (
    null
  );
}

// ─── Sponsorship ──────────────────────────────────────────────────────────────
const tiers = [
  { amount: "$50", title: "Learning Materials", desc: "Provide notebooks, pens, and essential study materials for one student.", highlight: false },
  { amount: "$150", title: "One Month of Training", desc: "Cover a full month of instruction, mentorship, and classroom resources.", highlight: false },
  { amount: "$500", title: "Semester Sponsorship", desc: "Sponsor a student for an entire semester of intensive skills training.", highlight: true },
  { amount: "$1,200", title: "Full Program Sponsorship", desc: "Fund a student through the complete vocational program to graduation.", highlight: false },
  { amount: "$2,000", title: "Graduate Tool Kit", desc: "Equip a graduate with professional tools and startup capital to launch their career.", highlight: false },
];

function Sponsorship() {
  return (
    null
  );
}

// ─── Partnership ──────────────────────────────────────────────────────────────
const partnerTypes = [
  { icon: <Heart size={20} />, label: "Financial Support" },
  { icon: <Cpu size={20} />, label: "Equipment Donations" },
  { icon: <Star size={20} />, label: "Scholarships" },
  { icon: <Users size={20} />, label: "Volunteer Training" },
  { icon: <Globe size={20} />, label: "Corporate Partnerships" },
];

function Partnership() {
  return (
    <section id="partner" className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
            >
              Partnerships
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 700,
                color: "#4B1E0F",
                lineHeight: 1.25,
              }}
            >
              Partner with Us
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#5a3020",
              }}
            >
              We welcome churches, businesses, NGOs, and individuals to join us
              in creating opportunities for Uganda's next generation. Together we
              can multiply impact across communities and generations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {partnerTypes.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-150"
                  style={{ background: "#EAF6EE", color: "#1E8E43" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#1E8E43";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#EAF6EE";
                    (e.currentTarget as HTMLElement).style.color = "#1E8E43";
                  }}
                >
                  {p.icon}
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-200"
              style={{
                background: "#4B1E0F",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#3a1509")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#4B1E0F")
              }
            >
              Become a Partner <ArrowRight size={16} />
            </button>
          </div>

          {/* Photo */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: "5/4", background: "#EAF6EE" }}
          >
            <img
              src="https://images.unsplash.com/photo-1591503049013-993ae5cf7e7c?w=700&h=560&fit=crop&auto=format"
              alt="Community gathering outdoors in Uganda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1551356522-1de5dc9c2c08?w=480&h=320&fit=crop&auto=format", alt: "Students in vocational workshop", tall: false },
  { src: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=480&h=600&fit=crop&auto=format", alt: "Teacher instructing students", tall: true },
  { src: "https://images.unsplash.com/photo-1543180920-667698c042cd?w=480&h=320&fit=crop&auto=format", alt: "Youth students standing together", tall: false },
  { src: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=480&h=480&fit=crop&auto=format", alt: "Group of children inside learning", tall: false },
  { src: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=480&h=600&fit=crop&auto=format", alt: "Children in classroom setting", tall: true },
  { src: "https://images.unsplash.com/photo-1741940365831-1a1fdc2e33ff?w=480&h=320&fit=crop&auto=format", alt: "Women working together on a project", tall: false },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24" style={{ background: "#F3EBDD" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#1E8E43", fontFamily: "'DM Sans', sans-serif" }}
          >
            Gallery
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#4B1E0F",
            }}
          >
            See the Vision
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden break-inside-avoid transition-all duration-200 group"
              style={{ background: "#EAF6EE" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 32px rgba(75,30,15,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover block"
                style={{ aspectRatio: img.tall ? "3/4" : "4/3" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "#1E8E43" }}
    >
      {/* Decorative leaf SVG background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { top: "10%", left: "5%", size: 120, opacity: 0.07 },
          { top: "60%", right: "8%", size: 160, opacity: 0.06 },
          { bottom: "5%", left: "40%", size: 90, opacity: 0.08 },
        ].map((pos, i) => (
          <svg
            key={i}
            width={pos.size}
            height={pos.size}
            viewBox="0 0 32 32"
            fill="none"
            style={{ position: "absolute", ...pos, opacity: pos.opacity }}
          >
            <path d="M8 24 C8 24 10 8 24 8 C24 8 22 22 8 24Z" fill="#fff" />
          </svg>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2
          className="mb-5"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          Give Skills. Restore Hope.
          <br />
          <em style={{ color: "#D9A441", fontStyle: "italic" }}>
            Transform Lives.
          </em>
        </h2>
        <p
          className="mb-10 max-w-xl mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Your support equips vulnerable youth and women in Uganda with
          practical skills, spiritual guidance, and the opportunity to build a
          brighter future.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollTo("#sponsor")}
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-200"
            style={{
              background: "#fff",
              color: "#1E8E43",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#f0fff4")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#fff")
            }
          >
            Donate Now
          </button>
          <button
            onClick={() => scrollTo("#partner")}
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.35)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)")
            }
          >
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" style={{ background: "#4B1E0F" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <ImageWithFallback
                src={lwpLogo}
                alt="Life with Purpose logo"
                className="h-10 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div
                className="text-xs mt-2"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Vocational Center · Uganda
              </div>
            </div>
            <p
              className="mb-5 max-w-xs"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Equipping Uganda's youth with practical skills, entrepreneurial
              knowledge, and spiritual guidance for sustainable futures.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href={i}+".com/lwpuganda"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#1E8E43")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.1)")
                  }
                  aria-label="Social media"
                >
                  <Icon size={15} color="rgba(255,255,255,0.8)" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#D9A441", fontFamily: "'DM Sans', sans-serif" }}
            >
              Quick Links
            </div>
            <ul className="space-y-2.5">
              {["About", "Programs", "Impact", "Testimonials", "Partner", "Gallery"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#fff")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "rgba(255,255,255,0.6)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#D9A441", fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact
            </div>
            <ul className="space-y-3">
              {[
                { icon: <MapPin size={14} />, text: "Kampala, Uganda" },
                { icon: <Mail size={14} />, text: "info@lwpvc.org" },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5"
                  style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
                >
                  <span style={{ color: "#1E8E43", marginTop: "2px", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            © 2024 Life with Purpose Foundation. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Registered Nonprofit · Uganda
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        scrollBehavior: "smooth",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(75,30,15,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(75,30,15,0.4); }
      `}</style>

      <Nav />
      <Hero />
      <About />
      <WhyItMatters />
      <Programs />
      <HolisticDevelopment />
      <StudentJourney />
      <Impact />
      <Testimonials />
      <Sponsorship />
      <Partnership />
      <Gallery />
      <FinalCTA />
      <Footer />
    </div>
  );
}
