import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'primary' | 'secondary' | 'accent' | 'none';
  animated?: boolean;
  glassMorphism?: boolean;
}

export const CyberCard = ({ 
  children, 
  className, 
  glow = 'none',
  animated = true,
  glassMorphism = true
}: CyberCardProps) => {
  const glowClasses = {
    primary: 'glow-primary',
    secondary: 'glow-secondary', 
    accent: 'glow-accent',
    none: ''
  };

  const cardContent = (
    <div
      className={cn(
        'rounded-lg border transition-all duration-300',
        glassMorphism ? 'glass-card' : 'bg-card border-border',
        glowClasses[glow],
        'hover:border-primary/50',
        className
      )}
    >
      {children}
    </div>
  );

  if (!animated) return cardContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {cardContent}
    </motion.div>
  );
};