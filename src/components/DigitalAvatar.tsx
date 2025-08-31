import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Zap, Brain, Sparkles } from 'lucide-react';
import { useDigitalTwin } from '@/stores/useDigitalTwin';

interface AvatarState {
  mood: 'happy' | 'curious' | 'focused' | 'excited' | 'thoughtful';
  expression: string;
  message: string;
  color: string;
}

export const DigitalAvatar = () => {
  const { vitals, recommendations, twin } = useDigitalTwin();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentState, setCurrentState] = useState<AvatarState>({
    mood: 'happy',
    expression: '😊',
    message: "Hello! I'm your AI companion, ready to help optimize your day.",
    color: 'hsl(200, 100%, 60%)'
  });
  const [showTooltip, setShowTooltip] = useState(false);

  // Avatar states based on data
  const avatarStates: Record<string, AvatarState> = {
    greeting: {
      mood: 'happy',
      expression: '👋',
      message: `Welcome back, ${twin?.name || 'friend'}! Ready to explore the city?`,
      color: 'hsl(200, 100%, 60%)'
    },
    analyzing: {
      mood: 'thoughtful',
      expression: '🤔',
      message: 'Analyzing your vitals and environment patterns...',
      color: 'hsl(270, 80%, 60%)'
    },
    alert: {
      mood: 'focused',
      expression: '🚨',
      message: 'I notice some optimization opportunities for you!',
      color: 'hsl(0, 100%, 60%)'
    },
    excited: {
      mood: 'excited',
      expression: '✨',
      message: 'Your health metrics look amazing today!',
      color: 'hsl(140, 100%, 60%)'
    },
    curious: {
      mood: 'curious',
      expression: '🔍',
      message: 'Click me to see what I can help you with today!',
      color: 'hsl(45, 100%, 60%)'
    }
  };

  // Determine avatar state based on context
  useEffect(() => {
    if (recommendations.length > 0) {
      const highPriorityAlerts = recommendations.filter(r => r.priority === 1);
      if (highPriorityAlerts.length > 0) {
        setCurrentState(avatarStates.alert);
      } else {
        setCurrentState(avatarStates.analyzing);
      }
    } else if (vitals && vitals.heartRate < 80 && vitals.stress < 0.3) {
      setCurrentState(avatarStates.excited);
    } else {
      setCurrentState(avatarStates.greeting);
    }
  }, [vitals, recommendations]);

  // Auto-cycle through states when idle
  useEffect(() => {
    if (!isHovered && !isClicked) {
      const interval = setInterval(() => {
        const states = Object.keys(avatarStates);
        const randomState = states[Math.floor(Math.random() * states.length)];
        setCurrentState(avatarStates[randomState]);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isHovered, isClicked]);

  const handleClick = () => {
    setIsClicked(true);
    setShowTooltip(true);
    
    // Cycle through different responses
    const responses = [
      avatarStates.excited,
      avatarStates.analyzing,
      avatarStates.curious
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setCurrentState(randomResponse);
    
    // Redirect to Gen Z Digital Vibe website after a short delay
    setTimeout(() => {
      window.open('https://preview--genz-digital-vibe.lovable.app/', '_blank');
    }, 1000);
    
    setTimeout(() => {
      setIsClicked(false);
      setShowTooltip(false);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Avatar Container */}
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle, ${currentState.color}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Pulse Rings */}
        <AnimatePresence>
          {!isClicked && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-30"
                style={{ borderColor: currentState.color }}
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-30"
                style={{ borderColor: currentState.color }}
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main Avatar Circle */}
        <motion.div
          className="relative w-32 h-32 rounded-full glass-card flex items-center justify-center cursor-pointer overflow-hidden"
          style={{
            boxShadow: `0 0 30px ${currentState.color}50`,
          }}
          animate={{
            scale: isClicked ? 1.1 : isHovered ? 1.05 : 1,
            rotateY: isHovered ? 10 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `conic-gradient(from 0deg, ${currentState.color}20, transparent, ${currentState.color}20)`,
            }}
          />

          {/* Avatar Expression */}
          <motion.div
            className="text-6xl z-10"
            animate={{
              rotateZ: isClicked ? [0, -10, 10, 0] : 0,
              scale: isClicked ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {currentState.expression}
          </motion.div>

          {/* Interactive Elements */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute top-2 right-2">
                  <MessageCircle className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="absolute bottom-2 left-2">
                  <Heart className="w-4 h-4 text-destructive animate-pulse" />
                </div>
                <div className="absolute top-2 left-2">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                </div>
                <div className="absolute bottom-2 right-2">
                  <Brain className="w-4 h-4 text-secondary animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Status Indicators */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-success"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-accent"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Message Bubble */}
      <AnimatePresence>
        {(isHovered || showTooltip) && (
          <motion.div
            className="mt-6 max-w-sm"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative glass-card p-4 rounded-xl">
              {/* Speech Bubble Arrow */}
              <div 
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45"
                style={{ backgroundColor: 'hsl(var(--glass-bg))' }}
              />
              
              <div className="relative z-10">
                <p className="text-sm text-center" style={{ color: currentState.color }}>
                  {currentState.message}
                </p>
                
                {recommendations.length > 0 && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Zap className="w-3 h-3 text-accent" />
                    <span className="text-xs text-muted-foreground">
                      {recommendations.length} insights available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Name and Status */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-gradient-primary">
          {twin?.name || 'Digital Twin'}
        </h3>
        <p 
          className="text-xs text-muted-foreground flex items-center justify-center gap-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => window.open('https://preview--genz-digital-vibe.lovable.app/', '_blank')}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-success"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          AI Twin Active
        </p>
      </motion.div>
    </div>
  );
};