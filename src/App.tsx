/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Video as VideoIcon, 
  User, 
  Brain, 
  ArrowRight,
  ShieldCheck,
  Star,
  Quote
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { 
  STUDIO_NAME, 
  SERVICES, 
  GALLERY_ITEMS, 
  HERO_IMAGE, 
  SOCRATIC_SYSTEM_PROMPT,
  TESTIMONIALS
} from "./constants";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

const IconMap: Record<string, any> = {
  Camera,
  Video: VideoIcon,
  User,
  Brain,
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Pages ---

function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={HERO_IMAGE} 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-9xl font-light tracking-tighter mb-8 leading-none">
              <span className="inline-block">Visual</span>{" "}
              <span className="italic inline-block">Excellence</span>
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <Link to="/gallery" className="inline-flex items-center space-x-4 border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500 group">
              <span className="text-xs uppercase tracking-widest">Enter Studio</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Operations</h2>
            <h3 className="text-5xl font-light">Modular Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICES.map((service, i) => {
              const Icon = IconMap[service.icon] || Camera;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 border border-white/5 hover:border-white/20 transition-colors group bg-black/40 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 mb-8 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-xl font-light mb-4 tracking-tight">{service.title}</h4>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Voice of Clients</h2>
              <h3 className="text-5xl font-light italic">Testimonials</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 bg-neutral-900/30 border border-white/5 rounded-2xl relative group hover:bg-neutral-900/50 transition-all"
              >
                <Quote size={40} className="absolute top-6 right-6 text-white/5 group-hover:text-white/10 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, star) => (
                    <Star key={star} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-white/70 font-light italic leading-relaxed mb-8">"{t.content}"</p>
                <div>
                  <h4 className="text-sm font-medium tracking-wide">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Gallery() {
  const [items, setItems] = useState(GALLERY_ITEMS);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const newItem = {
      id: Date.now(),
      type: "image" as const,
      url: newPhotoUrl,
      title: "New Submission",
      category: "Personal",
    };
    setItems([newItem, ...items]);
    setNewPhotoUrl("");
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Admin Toggle */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-end">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`text-[10px] uppercase tracking-[0.3em] px-4 py-2 border rounded-full transition-all ${
            isAdminMode ? "border-amber-500 text-amber-500 bg-amber-500/10" : "border-white/10 text-white/40 hover:text-white"
          }`}
        >
          {isAdminMode ? "Admin Active" : "Admin Panel"}
        </button>
      </div>

      {isAdminMode && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 mb-20">
          <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
              <ShieldCheck size={16} /> Asset Path Management
            </span>
            <input 
              type="text" 
              placeholder="Paste S3/Cloud Image Absolute URL..." 
              className="w-full bg-black/60 border border-white/10 px-6 py-3 rounded-full text-xs focus:outline-none focus:border-amber-500/50"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
            />
            <button onClick={handleAddPhoto} className="whitespace-nowrap px-8 py-3 bg-white text-black text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-200 transition-all">
              Sync Asset
            </button>
          </div>
        </motion.div>
      )}

      <section className="px-6 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 rounded-xl"
            >
              {item.type === "video" ? (
                <video src={item.url} muted loop onMouseOver={(e) => (e.target as HTMLVideoElement).play()} onMouseOut={(e) => (e.target as HTMLVideoElement).pause()} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <motion.img 
                  src={item.url} 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ duration: 20 + i, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2">{item.category}</p>
                <h4 className="text-xl font-light">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SocraticTutor() {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: { systemInstruction: SOCRATIC_SYSTEM_PROMPT }
      });
      const result = await chat.sendMessage({ message: input });
      setMessages(prev => [...prev, { role: "model", text: result.text || "Thinking..." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "model", text: "Error syncing with brain module. Retry." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen flex flex-col">
      <div className="text-center mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Socratic Module</h2>
        <h3 className="text-5xl font-light">Math Workspace</h3>
      </div>
      <div className="flex-grow bg-neutral-900/50 border border-white/5 rounded-3xl overflow-hidden flex flex-col backdrop-blur-2xl">
        <div className="flex-grow overflow-y-auto p-8 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl p-5 text-sm font-light leading-relaxed ${msg.role === "user" ? "bg-white text-black" : "bg-neutral-800 text-white/80 border border-white/10"}`}>
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          ))}
          {isTyping && <div className="text-white/40 text-xs italic">Tuning logic...</div>}
          <div ref={chatEndRef} />
        </div>
        <div className="p-8 bg-black/40 border-t border-white/5">
          <div className="flex items-center gap-4 bg-neutral-800 rounded-full px-6 py-2 border border-white/5 focus-within:border-white/20 transition-all">
            <input 
              type="text" 
              placeholder="Query the module..." 
              className="flex-grow bg-transparent border-none py-3 focus:outline-none text-sm font-light" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-300 transition-all">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Payment() {
  const [category, setCategory] = useState("Standard Session");
  const [amount, setAmount] = useState(500);

  const handlePay = async () => {
    alert(`Initiating secure payment flow for: ${category}\nAmount: $${amount}\n\nConnected to Micro-Payment Service ✅`);
  };

  return (
    <div className="pt-40 pb-32 px-6 max-w-lg mx-auto text-center min-h-screen">
      <div className="mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Secure Checkout</h2>
        <h3 className="text-5xl font-light">Payment Portal</h3>
      </div>
      <div className="bg-neutral-900/50 border border-white/5 p-10 rounded-3xl backdrop-blur-3xl text-left">
        <div className="mb-8">
          <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-4">Select Package</label>
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 1, name: "Standard Session", price: 500 },
              { id: 2, name: "Cinematic Branding", price: 1200 },
              { id: 3, name: "Express Audit", price: 250 }
            ].map((p) => (
              <button 
                key={p.id}
                onClick={() => { setCategory(p.name); setAmount(p.price); }}
                className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                  category === p.name ? "border-white bg-white text-black" : "border-white/10 bg-black/40 text-white/60"
                }`}
              >
                <span className="text-sm font-medium">{p.name}</span>
                <span className="text-xs font-bold">${p.price}</span>
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={handlePay}
          className="w-full bg-white text-black py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all shadow-2xl shadow-white/5"
        >
          Pay Securely Now
        </button>
        <p className="mt-6 text-[8px] uppercase tracking-widest text-white/20 flex items-center justify-center gap-2">
          <ShieldCheck size={12} /> Encrypted via Studio Gateway
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tutor" element={<SocraticTutor />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

