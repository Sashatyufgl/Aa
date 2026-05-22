
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

interface Scene {
  id: string;
  image: string;
  description: string;
  duration: number;
  animation: any;
}

const SCENES: Scene[] = [
  {
    id: "intro",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop", // Dark rustic wood texture
    description: "19th Century Ukrainian Mazanka",
    duration: 3000,
    animation: { scale: [1, 1.1], opacity: [0, 1] }
  },
  {
    id: "hostess",
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=2000&auto=format&fit=crop", // Warm indoor portrait feel
    description: "Hostess touching the warm pears",
    duration: 1800,
    animation: { scale: [1.1, 1.4], x: [0, -80], y: [0, -30] }
  },
  {
    id: "pears_close",
    image: "https://images.unsplash.com/photo-1514733670139-4d47a497a5f1?q=80&w=2000&auto=format&fit=crop",
    description: "Soft and juicy pear flesh",
    duration: 1200,
    animation: { scale: [1.5, 2.5], rotate: [0, 8] }
  },
  {
    id: "steam",
    image: "https://images.unsplash.com/photo-1542157585-ef20bacca039?q=80&w=2000&auto=format&fit=crop",
    description: "Whip pan: Steam rising",
    duration: 800,
    animation: { x: [400, 0], scale: [1.3, 1], filter: ["blur(20px)", "blur(0px)"] }
  },
  {
    id: "juice",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2000&auto=format&fit=crop",
    description: "Micro-zoom: Glistening juice",
    duration: 1400,
    animation: { scale: [2, 4], y: [0, 80] }
  },
  {
    id: "fast_cuts_1",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=2000&auto=format&fit=crop",
    description: "The cutting of the fruit",
    duration: 400,
    animation: { scale: [1, 1.2], rotate: [0, -5], x: [0, 20] }
  },
  {
    id: "fast_cuts_2",
    image: "https://images.unsplash.com/photo-1602492329759-f2694ad037e9?q=80&w=2000&auto=format&fit=crop",
    description: "The warmth of family",
    duration: 500,
    animation: { scale: [1.05, 1.15], y: [0, -20] }
  },
  {
    id: "final",
    image: "https://images.unsplash.com/photo-1514733670139-4d47a497a5f1?q=80&w=2000&auto=format&fit=crop",
    description: "Natural transformation through heat",
    duration: 6000,
    animation: { scale: [1, 1.08] }
  }
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      const currentScene = SCENES[currentIndex];
      timer = setTimeout(() => {
        if (currentIndex < SCENES.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, currentScene.duration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex]);

  const startSequence = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <main className="relative h-screen w-screen bg-cinematic-bg overflow-hidden flex flex-col">
      {/* Film Grain Layer */}
      <div className="film-grain" />

      {/* Overlay Noise / Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay stardust-texture z-50"></div>

      {/* Cinematic Header / Metadata Bar */}
      <header className="w-full flex justify-between items-end p-8 border-b border-clay h-24 relative z-50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-warm-gold opacity-60 mb-2">Cinematic Sequence / Traditional Ukrainian Mazanka</span>
          <h1 className="text-4xl italic font-light tracking-tighter font-serif">The Alchemy of Heat</h1>
        </div>
        <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-widest text-right">
          <div className="flex flex-col">
            <span className="opacity-40">Sequence</span>
            <span>04-B / Pears</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-40">Light Source</span>
            <span>Golden Hearth</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-40">Frame Rate</span>
            <span>24.00 FPS</span>
          </div>
        </div>
      </header>

      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-cinematic-bg via-transparent to-cinematic-bg opacity-60" />
      <div className="absolute inset-0 z-20 cinematic-shadow pointer-events-none" />

      {/* Experience Layer */}
      <div className="flex-1 relative overflow-hidden bg-[#1a1510]">
        <div className="absolute inset-0 paper-texture opacity-20 z-0"></div>
        {/* Simulated Glow */}
        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-cinematic-accent blur-[150px] opacity-20 animate-pulse z-0"></div>
        
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div
              key={SCENES[currentIndex].id}
              initial={{ opacity: 0, ...SCENES[currentIndex].animation.initial }}
              animate={{ 
                opacity: 1, 
                ...SCENES[currentIndex].animation,
                transition: { duration: SCENES[currentIndex].duration / 1000, ease: "linear" }
              }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="relative w-full h-full flex items-center justify-center p-1 bg-[#1a1510]"
            >
              <img
                src={SCENES[currentIndex].image}
                alt={SCENES[currentIndex].description}
                className="w-full h-full object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
              {/* Frame Label */}
              <div className="absolute top-12 left-12 border border-warm-gold px-3 py-1 text-[9px] uppercase tracking-tighter text-warm-gold bg-black/20 backdrop-blur-sm">
                Shot 0{currentIndex + 1} / Cinematic Sequence
              </div>

              {/* Smoke Overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  filter: 'blur(50px)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Screen Over Experience Area */}
        {!isPlaying && currentIndex === 0 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl text-center space-y-8"
            >
              <span className="block text-xs uppercase tracking-[0.5em] text-warm-gold">Historical Sensory Archive</span>
              <h2 className="text-7xl font-serif italic font-light tracking-tighter text-mazanka-white">
                Vybukh
              </h2>
              <p className="text-xl font-serif text-mazanka-white/80 leading-relaxed italic border-l-2 border-warm-gold pl-8 py-2 text-left">
                A soft hand meets the yielding flesh of sun-baked pears, where the heat has turned fiber into honey.
              </p>
              <div className="flex justify-center pt-8">
                <button
                  onClick={startSequence}
                  className="group relative px-16 py-6 bg-warm-gold text-black uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all hover:tracking-[0.4em]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Play className="w-4 h-4 fill-current" />
                    Enter Sequence
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* End Screen Over Experience Area */}
        {!isPlaying && currentIndex > 0 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-12 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-center space-y-12"
            >
              <p className="text-6xl font-serif italic text-warm-gold">Softness as strength.</p>
              <p className="text-mazanka-white/60 uppercase tracking-[0.4em] text-[10px]">The Transformation is Complete</p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleRestart}
                  className="px-12 py-4 border border-warm-gold text-warm-gold uppercase tracking-widest text-[10px] hover:bg-warm-gold hover:text-black transition-all"
                >
                  Rewatch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Footer Narrative Bar */}
      <footer className="h-48 bg-cinematic-bg flex items-center px-12 relative border-t border-clay z-50">
        <div className="grid grid-cols-12 w-full items-center">
          <div className="col-span-12 lg:col-span-3 mb-6 lg:mb-0">
             <div className="text-7xl font-black text-[#1a1510] absolute left-[-10px] top-12 select-none uppercase leading-none opacity-20">Heat</div>
             <p className="relative z-10 text-[11px] leading-relaxed uppercase tracking-widest text-warm-gold border-l-2 border-warm-gold pl-6">
              Softness as strength.<br />Sweetness as survival.<br />The hearth transforms the harvest.
             </p>
          </div>
          <div className="hidden lg:flex col-span-6 justify-center">
            <div className="flex items-center space-x-4 overflow-hidden py-4">
              <div className="w-12 h-12 rounded-full border border-warm-gold flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-warm-gold rounded-full animate-ping"></div>
              </div>
              <div className="h-[1px] w-32 bg-clay"></div>
              <span className="text-[10px] tracking-tighter opacity-50 italic uppercase text-mazanka-white">Emotional historical food realism</span>
              <div className="h-[1px] w-32 bg-clay"></div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3 text-right">
            <p className="text-5xl font-light tracking-tighter italic opacity-90 font-serif">Mazanka</p>
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">19th Century Traditional</span>
          </div>
        </div>
      </footer>

      {/* Dust Particles Layer */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${Math.random()})`,
              opacity: Math.random() * 0.4
            }}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 z-[60] text-mazanka-white/10 text-[9px] uppercase tracking-[0.3em] font-sans">
        REC ● {new Date().toLocaleTimeString()}
      </div>
    </main>
  );
}
