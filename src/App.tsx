import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [bubble, setBubble] = useState({ visible: false, x: 0, y: 0 });

  const handleCopy = async (e: MouseEvent) => {
    try {
      await navigator.clipboard.writeText('Updating. View @lozendev for CA');
      setBubble({ visible: true, x: e.clientX, y: e.clientY });
      setTimeout(() => setBubble(prev => ({ ...prev, visible: false })), 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="h-screen w-full bg-black relative p-4 sm:p-8 flex items-center justify-center overflow-hidden">
      {/* Hidden Top Left Text */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <span className="text-black font-mono text-[10px] sm:text-xs selection:bg-white selection:text-black cursor-text">
          LOZENPRJKT#4
        </span>
      </div>

      {/* Top Right X Button */}
      <a
        href="https://www.x.com/lozendev"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 bg-black"
        aria-label="X"
      />

      {/* Bottom Right Whitepaper Button */}
      <a
        href="https://www.dropbox.com/scl/fi/h78gof9t2dnx6pf741kxb/whitepaper.PDF?rlkey=eqbac8djy44yhoq8jud9szi8k&st=yzpdf1s8&dl=0"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 z-20 w-16 h-16 sm:w-20 sm:h-20 bg-black"
        aria-label="Whitepaper"
      />

      {/* Huge Button */}
      <button
        onClick={handleCopy}
        className="w-full h-full bg-black flex items-center justify-center cursor-pointer outline-none focus:ring-1 focus:ring-white/10 transition-all duration-300"
        aria-label="Copy CA"
      >
        <span className="text-white font-mono text-xs sm:text-sm tracking-[0.4em] sm:tracking-[0.6em] lowercase">
          nothing here today ...
        </span>
      </button>

      {/* Pixelated Speech Bubble */}
      <AnimatePresence>
        {bubble.visible && (
          <div
            className="absolute pointer-events-none z-50"
            style={{ left: bubble.x, top: bubble.y - 20, transform: 'translate(-50%, -100%)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white text-black font-mono text-[10px] sm:text-xs px-3 py-2 uppercase tracking-wider relative">
                copied
                {/* Pixelated tail */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-white"></div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white"></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
