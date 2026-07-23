import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PROFILE } from '../data';

export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-[#0C0C0C]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.img
            src="/logo-mdh.png"
            alt=""
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 h-12 w-auto sm:h-14"
          />
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-[#D7E2EA]/15 sm:w-56">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #646973 0%, #BBCCD7 100%)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: reduce ? 0.2 : 1.3, ease: 'easeInOut' }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]"
          >
            {PROFILE.name}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
