import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NOTHING_MESSAGES = [
  'still nothing',
  'newp, nothing',
  'nope, nothing',
  'absolutely nothing',
  'literally nothing',
  'nothing to see here',
  'zero. zip. nada.',
  'still empty',
  'nothing found',
  'not a thing',
  'pure emptiness',
  'nothing changed',
  'nice try, still nothing',
  'why are you clicking? nothing',
  'still nothing here',
  '404: nothing',
  'nothing at all',
  'blank',
  'null',
  'nothingness',
  'empty space',
  'total void',
  'still nothing, friend',
  'nope. nada.',
  'what did you expect? nothing',
  'still blank',
  'nothing whatsoever',
  'zero bytes',
  'unmistakably nothing',
  'infinite nothing',
  'yep, still nothing',
  'still nothing new',
  'still nothing to copy',
  'definitely nothing',
  'guaranteed nothing',
  '100% nothing',
  'still zero',
  'nah, nothing',
  'still void',
  'nothing in sight',
  'crickets... nothing',
  'fresh out of nothing',
  'just more nothing',
  'spoiler: nothing',
  'still nada',
  'empty void',
  'complete absence',
  'nothing yet',
  'still no signal',
  'nothing doing',
  'still zilch',
  'nothing happening',
  'vacuum of nothing',
  'certified nothing',
  'guess what? nothing',
];

export default function App() {
  const [bubble, setBubble] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
    id: number;
  }>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
    id: 0,
  });

  const poolRef = useRef<string[]>([]);
  const lastMessageRef = useRef<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getNextMessage = () => {
    if (poolRef.current.length === 0) {
      const shuffled = [...NOTHING_MESSAGES].sort(() => Math.random() - 0.5);
      if (shuffled[shuffled.length - 1] === lastMessageRef.current && shuffled.length > 1) {
        const temp = shuffled[shuffled.length - 1];
        shuffled[shuffled.length - 1] = shuffled[0];
        shuffled[0] = temp;
      }
      poolRef.current = shuffled;
    }
    const next = poolRef.current.pop() || NOTHING_MESSAGES[0];
    lastMessageRef.current = next;
    return next;
  };

  const handleCopy = async (e: MouseEvent) => {
    try {
      await navigator.clipboard.writeText('Updating. View @lozendev for CA');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    const nextText = getNextMessage();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setBubble({
      visible: true,
      text: nextText,
      x: e.clientX,
      y: e.clientY,
      id: Date.now() + Math.random(),
    });

    timeoutRef.current = setTimeout(() => {
      setBubble(prev => ({ ...prev, visible: false }));
    }, 1200);
  };

  return (
    <div className="h-screen w-full bg-black relative p-4 sm:p-8 flex items-center justify-center overflow-hidden">
      {/* Hidden Top Left Text */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <a
          href="https://www.lozen.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-mono text-[10px] sm:text-xs selection:bg-white selection:text-black cursor-text"
        >
          LOZENPRJKT#4
        </a>
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
        className="w-full h-full bg-black flex items-center justify-center cursor-pointer outline-none transition-all duration-300"
        aria-label="Copy CA"
      >
        <span className="text-white font-mono text-xs sm:text-sm tracking-[0.4em] sm:tracking-[0.6em] lowercase">
          nothing here today ...
        </span>
      </button>

      {/* Pixelated Speech Bubble */}
      <AnimatePresence mode="wait">
        {bubble.visible && (
          <div
            key={bubble.id}
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
              <div className="bg-white text-black font-mono text-[10px] sm:text-xs px-3 py-2 uppercase tracking-wider relative whitespace-nowrap select-none">
                {bubble.text}
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
