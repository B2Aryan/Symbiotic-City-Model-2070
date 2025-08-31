import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Zap, Rocket, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { CyberCard } from './CyberCard';
import { cn } from '@/lib/utils';

interface GlobalTeleportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeleport: (destination: string) => void;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  icon: string;
  description: string;
  timezone: string;
  localTime: string;
  distance: string;
  teleportTime: number;
  status: 'available' | 'maintenance' | 'busy';
}

const globalDestinations: Destination[] = [
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    icon: '🗽',
    description: 'The city that never sleeps - Financial and cultural hub',
    timezone: 'EST',
    localTime: '9:30 AM',
    distance: '11,000 km',
    teleportTime: 3,
    status: 'available'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    icon: '🗾',
    description: 'Futuristic metropolis with cutting-edge technology',
    timezone: 'JST',
    localTime: '11:30 PM',
    distance: '13,500 km',
    teleportTime: 4,
    status: 'available'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    icon: '🗼',
    description: 'City of lights and artistic inspiration',
    timezone: 'CET',
    localTime: '3:30 PM',
    distance: '8,900 km',
    teleportTime: 3,
    status: 'available'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    icon: '🏙️',
    description: 'Desert metropolis with architectural wonders',
    timezone: 'GST',
    localTime: '6:30 PM',
    distance: '7,200 km',
    teleportTime: 2,
    status: 'available'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    icon: '🌆',
    description: 'Garden city with perfect urban planning',
    timezone: 'SGT',
    localTime: '10:30 PM',
    distance: '3,800 km',
    teleportTime: 2,
    status: 'available'
  },
  {
    id: 'london',
    name: 'London',
    country: 'UK',
    icon: '🏰',
    description: 'Historic capital with modern innovation',
    timezone: 'GMT',
    localTime: '2:30 PM',
    distance: '9,500 km',
    teleportTime: 3,
    status: 'available'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    icon: '🏖️',
    description: 'Harbor city with stunning natural beauty',
    timezone: 'AEST',
    localTime: '1:30 AM',
    distance: '15,200 km',
    teleportTime: 5,
    status: 'available'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    icon: '🏛️',
    description: 'Bollywood city with rich cultural heritage',
    timezone: 'IST',
    localTime: '8:00 PM',
    distance: '5,600 km',
    teleportTime: 2,
    status: 'maintenance'
  }
];

export const GlobalTeleportModal = ({ isOpen, onClose, onTeleport }: GlobalTeleportModalProps) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [teleportStep, setTeleportStep] = useState<'select' | 'confirm' | 'teleporting' | 'success'>('select');
  const [isTeleporting, setIsTeleporting] = useState(false);

  const handleDestinationSelect = (destination: Destination) => {
    if (destination.status !== 'available') return;
    setSelectedDestination(destination);
    setTeleportStep('confirm');
  };

  const handleTeleportConfirm = async () => {
    if (!selectedDestination) return;
    
    setIsTeleporting(true);
    setTeleportStep('teleporting');
    
    // Simulate teleportation process
    await new Promise(resolve => setTimeout(resolve, selectedDestination.teleportTime * 1000));
    
    setTeleportStep('success');
    onTeleport(selectedDestination.name);
    
    // Auto-close after showing success
    setTimeout(() => {
      onClose();
      setTeleportStep('select');
      setSelectedDestination(null);
      setIsTeleporting(false);
    }, 3000);
  };

  const handleBack = () => {
    if (teleportStep === 'confirm') {
      setTeleportStep('select');
      setSelectedDestination(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <CyberCard className="p-0 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border/50 bg-gradient-surface">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gradient-primary">Global Teleport Station</h2>
                    <p className="text-sm text-muted-foreground">
                      {teleportStep === 'select' && 'Select your destination'}
                      {teleportStep === 'confirm' && 'Confirm teleportation'}
                      {teleportStep === 'teleporting' && 'Teleporting...'}
                      {teleportStep === 'success' && 'Teleportation complete!'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {teleportStep === 'select' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Global Teleport Network Active
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {globalDestinations.map((destination) => (
                      <motion.div
                        key={destination.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                          destination.status === 'available'
                            ? "border-border/50 hover:border-primary/50 bg-gradient-surface hover:bg-gradient-surface/80"
                            : "border-border/30 bg-muted/50 cursor-not-allowed opacity-60"
                        )}
                        onClick={() => destination.status === 'available' && handleDestinationSelect(destination)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{destination.icon}</div>
                            <div>
                              <h3 className="font-semibold">{destination.name}</h3>
                              <p className="text-xs text-muted-foreground">{destination.country}</p>
                              <p className="text-xs text-muted-foreground mt-1">{destination.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-primary font-mono text-sm">
                              <Clock className="w-3 h-3" />
                              <span>{destination.teleportTime}s</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{destination.distance}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {destination.timezone} {destination.localTime}
                            </div>
                          </div>
                        </div>
                        
                        {destination.status === 'maintenance' && (
                          <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
                            ⚠️ Under maintenance
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {teleportStep === 'confirm' && selectedDestination && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{selectedDestination.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{selectedDestination.name}</h3>
                    <p className="text-muted-foreground">{selectedDestination.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-surface rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Teleport Time</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-primary">
                        {selectedDestination.teleportTime} seconds
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-surface rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-semibold">Distance</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-accent">
                        {selectedDestination.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                      disabled={isTeleporting}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleTeleportConfirm}
                      className="flex-1 glow-primary"
                      disabled={isTeleporting}
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Initiate Teleport
                    </Button>
                  </div>
                </motion.div>
              )}

              {teleportStep === 'teleporting' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="relative">
                    {/* Teleport Beam Effect */}
                    <motion.div
                      className="w-32 h-32 mx-auto bg-gradient-to-t from-primary via-accent to-secondary rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Portal Rings */}
                    <motion.div
                      className="absolute inset-0 w-32 h-32 mx-auto border-4 border-primary rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 w-32 h-32 mx-auto border-4 border-accent rounded-full"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Teleporting to {selectedDestination?.name}...</h3>
                    <p className="text-muted-foreground">Quantum entanglement in progress</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-accent rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-secondary rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              {teleportStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-success mb-2">Teleportation Complete!</h3>
                    <p className="text-muted-foreground">
                      Welcome to {selectedDestination?.name}! 🚀
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </CyberCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
