import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #646973 0%, #BBCCD7 100%)',
      }}
      className="fixed left-0 top-0 z-[120] h-[3px] w-full origin-left"
    />
  );
}
