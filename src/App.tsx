/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Camera, 
  Video, 
  User, 
  Briefcase, 
  Menu, 
  X,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { STUDIO_NAME, SOCIAL_LINKS, SERVICES, GALLERY_ITEMS } from "./constants";

const IconMap: Record<string, any> = {
  Camera,
  Video,
  User,
  Briefcase,
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-light tracking-[0.2em] uppercase"
          >
            {STUDIO_NAME}
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {["Gallery", "Services", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs uppercase tracking-widest hover:text-white/60 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8"
          >
            {["Gallery", "Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-light uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
          
          {/* Floating Light Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: Math.random() * 100 - 50 + "%", 
                y: Math.random() * 100 - 50 + "%" 
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: [null, Math.random() * 100 - 50 + "%"],
                y: [null, Math.random() * 100 - 50 + "%"]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl"
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-9xl font-light tracking-tighter mb-8 leading-none">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="inline-block"
              >
                Visual
              </motion.span>{" "}
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="italic inline-block"
              >
                Excellence
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <a 
              href="#gallery"
              className="inline-flex items-center space-x-4 border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <span className="text-xs uppercase tracking-widest">Explore Work</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Portfolio</h2>
            <h3 className="text-5xl font-light">Selected Works</h3>
          </div>
          <p className="max-w-md text-white/50 font-light leading-relaxed">
            A curation of moments captured through our lens, ranging from intimate portraits to grand cinematic productions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-900"
            >
              {item.type === "video" ? (
                <div className="w-full h-full relative">
                  <video 
                    src={item.url} 
                    poster={item.thumbnail}
                    muted 
                    loop 
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full">
                    <Video size={14} />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full overflow-hidden">
                  <motion.img 
                    src={item.url} 
                    alt={item.title}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      x: [0, 5, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 15 + i * 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="w-full h-full object-cover opacity-100 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2">{item.category}</p>
                <h4 className="text-xl font-light">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">What we do</h2>
            <h3 className="text-5xl font-light">Our Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICES.map((service, i) => {
              const Icon = IconMap[service.icon];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 mb-8 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-light mb-4 tracking-tight">{service.title}</h4>
                  <p className="text-sm text-white/40 font-light leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-light tracking-[0.2em] uppercase mb-8">{STUDIO_NAME}</h2>
              <p className="text-white/40 font-light max-w-sm leading-relaxed mb-8">
                Crafting timeless visual stories through the art of photography and cinematography. Available for projects worldwide.
              </p>
              <div className="flex space-x-6">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  <Youtube size={20} strokeWidth={1.5} />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  <Twitter size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-8 text-white/40">Navigation</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#gallery" className="hover:text-white/60 transition-colors">Gallery</a></li>
                <li><a href="#services" className="hover:text-white/60 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white/60 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white/60 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-8 text-white/40">Contact</h4>
              <ul className="space-y-4 text-sm font-light text-white/60">
                <li>hello@prasanthstudio.com</li>
                <li>+1 (555) 000-0000</li>
                <li>Studio 42, Creative District</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <p>© {new Date().getFullYear()} {STUDIO_NAME}. All Rights Reserved.</p>
            <p>Designed for Visual Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
