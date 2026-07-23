import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { type ElementType, type ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'style'>;

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(as);
  return (
    <MotionTag
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration: reduce ? 0.3 : duration, delay: reduce ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
