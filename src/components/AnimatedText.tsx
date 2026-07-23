import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      {/* invisible placeholder keeps layout/wrapping intact */}
      <span className="opacity-0">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Reduced motion: render plain, fully-legible text with no per-char reveal.
  if (reduce) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  const chars = text.split('');
  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + 1 / chars.length;
        return char === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <Char key={i} char={char} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}
