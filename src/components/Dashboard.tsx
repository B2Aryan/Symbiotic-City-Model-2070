import { motion } from 'framer-motion';
import { Bot, Settings, Map, Users, Zap, Globe } from 'lucide-react';
import { VitalsWidget } from './widgets/VitalsWidget';
import { EnvironmentWidget } from './widgets/EnvironmentWidget';
import { AITwinPanel } from './widgets/AITwinPanel';
import { MobilityWidget } from './widgets/MobilityWidget';
import { SocialWidget } from './widgets/SocialWidget';
import { SmartPodBookingWidget } from './widgets/SmartPodBookingWidget';
import { Button } from './ui/button';
import { useDigitalTwin } from '@/stores/useDigitalTwin';
import { useCityState } from '@/stores/useCityState';
import { DigitalAvatar } from './DigitalAvatar';
import { useNavigate } from 'react-router-dom';
import { SmartPodBookingModal } from './SmartPodBookingModal';
import { GlobalTeleportModal } from './GlobalTeleportModal';
import { NotificationSystem, useNotifications } from './NotificationSystem';
import { useState } from 'react';

export const Dashboard = () => {
  const { twin, vitals, recommendations } = useDigitalTwin();
  const { setCurrentDistrict, setPlayerPosition, bookMobility } = useCityState();
  const navigate = useNavigate();
  const { notifications, removeNotification, showWelcomeMessage, showArrivalMessage, showBookingConfirmation } = useNotifications();
  const [isPodBookingOpen, setIsPodBookingOpen] = useState(false);
  const [isTeleportModalOpen, setIsTeleportModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const handleSocialHubClick = () => {
    // Navigate to Social Hub page
    navigate('/social');
  };

  const handlePodBookingClick = () => {
    setIsPodBookingOpen(true);
  };

  const handleBookingConfirmed = (destination: string, estimatedTime: number) => {
    // Book the mobility
    const bookingId = bookMobility({
      origin: 'current',
      destination,
      mode: 'pod',
      estimatedTime,
    });

    showBookingConfirmation(destination, estimatedTime);

    // Simulate arrival after travel time
    setTimeout(() => {
      setCurrentDistrict(destination);
      showArrivalMessage(destination);
    }, estimatedTime * 1000);
  };

  const handleTeleportClick = () => {
    setIsTeleportModalOpen(true);
  };

  const handleTeleport = (destination: string) => {
    showArrivalMessage(destination);
    // Simulate global teleportation effect
    console.log(`Teleporting to ${destination}...`);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/50 bg-gradient-surface backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient-primary">
                    Symbiotic Digital City
                  </h1>
                  <p className="text-sm text-muted-foreground">2070 • New Singapore</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50 cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => window.open('https://preview--genz-digital-vibe.lovable.app/', '_blank')}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{twin?.name || 'Digital You'}</p>
                  <p className="text-xs text-muted-foreground">AI Twin Active</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://symbiotic-cityscape.lovable.app/', '_blank')}
              >
                <Map className="w-4 h-4 mr-2" />
                City View
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-8"
      >
        {/* Hero Section with Digital Avatar */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-surface border border-border/50 p-8 lg:p-12">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-glow opacity-30" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-secondary opacity-10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="text-center lg:text-left space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-4">
                    Welcome to Your
                    <br />
                    <span className="text-gradient-secondary">Digital Life</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-xl">
                    Your AI twin is monitoring your wellness, optimizing your environment, and connecting you 
                    with the symbiotic city ecosystem. Everything is designed to enhance your human experience.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg" 
                    className="glow-primary"
                    onClick={() => window.open('https://symbiotic-cityscape.lovable.app/', '_blank')}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Explore City
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleSocialHubClick}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Social Hub
                  </Button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-4 pt-6"
                >
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-primary">
                      {vitals ? Math.round(vitals.heartRate) : '--'}
                    </div>
                    <div className="text-xs text-muted-foreground">Heart Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-accent">
                      {recommendations.length}
                    </div>
                    <div className="text-xs text-muted-foreground">AI Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-secondary">
                      4
                    </div>
                    <div className="text-xs text-muted-foreground">Districts</div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Digital Avatar */}
              <div className="flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <DigitalAvatar />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Widgets */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Row - Vitals & Environment */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VitalsWidget />
              <EnvironmentWidget />
            </motion.div>

            {/* Bottom Row - Mobility & Social */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MobilityWidget />
              <SocialWidget />
            </motion.div>
          </div>

          {/* Right Column - AI Twin Panel & Smart Pod Booking */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <AITwinPanel />
            <SmartPodBookingWidget onBookPod={handlePodBookingClick} />
          </motion.div>
        </div>

        {/* Quick Actions Footer */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 p-6 bg-gradient-surface rounded-lg border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('https://symbiotic-cityscape.lovable.app/', '_blank')}
            >
              <Map className="w-6 h-6" />
              <span className="text-sm">Explore City</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={handleSocialHubClick}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Social Hub</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2 glow-primary"
              onClick={handlePodBookingClick}
            >
              <Zap className="w-6 h-6" />
              <span className="text-sm">Book a Pod</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2 glow-secondary"
              onClick={handleTeleportClick}
            >
              <Globe className="w-6 h-6" />
              <span className="text-sm">Global Teleport</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Bot className="w-6 h-6" />
              <span className="text-sm">AI Settings</span>
            </Button>
          </div>
        </motion.div>
      </motion.main>

      {/* Smart Pod Booking Modal */}
      <SmartPodBookingModal
        isOpen={isPodBookingOpen}
        onClose={() => setIsPodBookingOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Global Teleport Modal */}
      <GlobalTeleportModal
        isOpen={isTeleportModalOpen}
        onClose={() => setIsTeleportModalOpen(false)}
        onTeleport={handleTeleport}
      />

      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />
    </div>
  );
};