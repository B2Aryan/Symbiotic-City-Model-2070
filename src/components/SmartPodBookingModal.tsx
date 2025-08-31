import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Users, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { CyberCard } from './CyberCard';
import { useCityState } from '@/stores/useCityState';
import { cn } from '@/lib/utils';

interface PodBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (destination: string, estimatedTime: number) => void;
}

interface Destination {
  id: string;
  name: string;
  icon: string;
  description: string;
  estimatedTime: number;
  available: boolean;
  currentOccupancy: number;
  maxCapacity: number;
}

const destinations: Destination[] = [
  {
    id: 'office',
    name: 'Office Hub',
    icon: '🏢',
    description: 'Collaborative workspaces with AI productivity enhancement',
    estimatedTime: 3,
    available: true,
    currentOccupancy: 2,
    maxCapacity: 8,
  },
  {
    id: 'clinic',
    name: 'Health Clinic',
    icon: '🏥',
    description: 'Advanced health monitoring and preventive care',
    estimatedTime: 2,
    available: true,
    currentOccupancy: 1,
    maxCapacity: 6,
  },
  {
    id: 'school',
    name: 'Learning Center',
    icon: '🎓',
    description: 'AI-powered education and skill development',
    estimatedTime: 4,
    available: true,
    currentOccupancy: 3,
    maxCapacity: 10,
  },
  {
    id: 'social',
    name: 'Social Hub',
    icon: '🎭',
    description: 'Community spaces for connection and entertainment',
    estimatedTime: 2,
    available: true,
    currentOccupancy: 4,
    maxCapacity: 12,
  },
  {
    id: 'houses',
    name: 'Residential District',
    icon: '🏠',
    description: 'Smart homes and personal sanctuaries',
    estimatedTime: 1,
    available: true,
    currentOccupancy: 0,
    maxCapacity: 4,
  },
  {
    id: 'entertainment',
    name: 'Entertainment Zone',
    icon: '🎮',
    description: 'Virtual reality experiences and gaming',
    estimatedTime: 3,
    available: true,
    currentOccupancy: 2,
    maxCapacity: 8,
  },
];

export const SmartPodBookingModal = ({ isOpen, onClose, onBookingConfirmed }: PodBookingModalProps) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [availablePods, setAvailablePods] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setSelectedDestination(null);
      setBookingStep('select');
      setIsBooking(false);
      // Simulate pod availability updates
      const interval = setInterval(() => {
        setAvailablePods(Math.max(1, Math.floor(Math.random() * 5) + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    setBookingStep('confirm');
  };

  const handleBookingConfirm = async () => {
    if (!selectedDestination) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBookingStep('success');
    
    // Call the parent callback
    onBookingConfirmed(selectedDestination.id, selectedDestination.estimatedTime);
    
    // Auto-close after showing success
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleBack = () => {
    if (bookingStep === 'confirm') {
      setBookingStep('select');
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
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <CyberCard className="p-0 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border/50 bg-gradient-surface">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gradient-primary">Smart Pod Booking</h2>
                    <p className="text-sm text-muted-foreground">
                      {bookingStep === 'select' && `${availablePods} pods available`}
                      {bookingStep === 'confirm' && 'Confirm your journey'}
                      {bookingStep === 'success' && 'Booking confirmed!'}
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
              {bookingStep === 'select' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      {availablePods} Smart Pods Available
                    </span>
                  </div>
                  
                  <div className="grid gap-3">
                    {destinations.map((destination) => (
                      <motion.div
                        key={destination.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                          destination.available
                            ? "border-border/50 hover:border-primary/50 bg-gradient-surface hover:bg-gradient-surface/80"
                            : "border-border/30 bg-muted/50 cursor-not-allowed opacity-60"
                        )}
                        onClick={() => destination.available && handleDestinationSelect(destination)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{destination.icon}</div>
                            <div>
                              <h3 className="font-semibold">{destination.name}</h3>
                              <p className="text-sm text-muted-foreground">{destination.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-primary font-mono">
                              <Clock className="w-4 h-4" />
                              <span>{destination.estimatedTime}m</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Users className="w-3 h-3" />
                              <span>{destination.currentOccupancy}/{destination.maxCapacity}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {bookingStep === 'confirm' && selectedDestination && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{selectedDestination.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{selectedDestination.name}</h3>
                    <p className="text-muted-foreground">{selectedDestination.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-surface rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Travel Time</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-primary">
                        {selectedDestination.estimatedTime} min
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-surface rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-semibold">Distance</span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-accent">
                        {(selectedDestination.estimatedTime * 0.8).toFixed(1)} km
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                      disabled={isBooking}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleBookingConfirm}
                      className="flex-1 glow-primary"
                      disabled={isBooking}
                    >
                      {isBooking ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Booking...
                        </div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {bookingStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-success mb-2">Booking Confirmed!</h3>
                    <p className="text-muted-foreground">
                      Your Smart Pod is on its way. Prepare for departure in {selectedDestination?.estimatedTime} minutes.
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
