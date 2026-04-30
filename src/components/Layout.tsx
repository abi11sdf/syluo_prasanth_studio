import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Menu, 
  X,
  LayoutDashboard,
  Zap
} from "lucide-react";
import { STUDIO_NAME, CURRENT_BRANCH, BRANCHES, SOCIAL_LINKS, STUDIO_EMAIL, STUDIO_PHONE, STUDIO_LOCATION } from "../constants";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Socratic Tutor", path: "/tutor" },
    { name: "Payment", path: "/payment" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-light tracking-[0.2em] uppercase flex items-center gap-2">
            {STUDIO_NAME}
            {CURRENT_BRANCH === BRANCHES.DEV && (
              <span className="text-[10px] bg-amber-500/20 text-amber-500 px-2 py-1 rounded tracking-widest border border-amber-500/30">DEV</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[10px] uppercase tracking-widest transition-colors ${
                  location.pathname === item.path ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/#contact" 
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-light uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* Footer */}
      <footer id="contact" className="py-24 border-t border-white/5 relative bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <div className="px-3 py-1 bg-black border border-white/10 rounded-full flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Backend Secured
          </div>
          <div className="px-3 py-1 bg-black border border-white/10 rounded-full flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/40">
            <Zap size={10} className="text-amber-500" />
            Env: Micro-Module
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-light tracking-[0.2em] uppercase mb-8">{STUDIO_NAME}</h2>
              <p className="text-white/40 font-light max-w-sm leading-relaxed mb-8">
                Crafting timeless visual stories. Our systems are built using modular microservice architectures for maximum scalability and security.
              </p>
              <div className="flex space-x-6">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110">
                  <Youtube size={20} strokeWidth={1.5} />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110">
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:scale-110">
                  <Twitter size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-8 text-white/40">Services</h4>
              <ul className="space-y-4 text-sm font-light text-white/60">
                <li>Production Audit</li>
                <li>Cloud Asset Sync</li>
                <li>Cinematic Branding</li>
                <li>Digital Mastery</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-8 text-white/40">Contact Information</h4>
              <ul className="space-y-4 text-sm font-light text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => window.location.href = `mailto:${STUDIO_EMAIL}`}>
                  {STUDIO_EMAIL}
                </li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => window.location.href = `tel:${STUDIO_PHONE}`}>
                  {STUDIO_PHONE}
                </li>
                <li>{STUDIO_LOCATION}, Tamil Nadu</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <p>© {new Date().getFullYear()} {STUDIO_NAME} Engineering. All Rights Reserved.</p>
            <p>Built with Microservice Integrity</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
