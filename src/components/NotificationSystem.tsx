import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin, Users, Zap } from 'lucide-react';
import { CyberCard } from './CyberCard';

interface Notification {
  id: string;
  type: 'welcome' | 'arrival' | 'booking' | 'info';
  title: string;
  message: string;
  icon?: React.ReactNode;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemoveNotification: (id: string) => void;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'welcome':
      return <Users className="w-5 h-5 text-secondary" />;
    case 'arrival':
      return <MapPin className="w-5 h-5 text-success" />;
    case 'booking':
      return <Zap className="w-5 h-5 text-primary" />;
    case 'info':
      return <CheckCircle className="w-5 h-5 text-accent" />;
    default:
      return <CheckCircle className="w-5 h-5 text-accent" />;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'welcome':
      return 'border-secondary/50 bg-secondary/10';
    case 'arrival':
      return 'border-success/50 bg-success/10';
    case 'booking':
      return 'border-primary/50 bg-primary/10';
    case 'info':
      return 'border-accent/50 bg-accent/10';
    default:
      return 'border-accent/50 bg-accent/10';
  }
};

export const NotificationSystem = ({ notifications, onRemoveNotification }: NotificationSystemProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <CyberCard className={`p-4 border ${getNotificationColor(notification.type)}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {notification.icon || getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
                <button
                  onClick={() => onRemoveNotification(notification.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ×
                </button>
              </div>
            </CyberCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration or default 5 seconds
    const duration = notification.duration || 5000;
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showWelcomeMessage = (location: string) => {
    addNotification({
      type: 'welcome',
      title: 'Welcome to the Social Hub!',
      message: `You've entered the ${location} — meet and interact here!`,
      duration: 4000,
    });
  };

  const showArrivalMessage = (destination: string) => {
    addNotification({
      type: 'arrival',
      title: 'Arrival Complete!',
      message: `You've arrived at ${destination}!`,
      duration: 4000,
    });
  };

  const showBookingConfirmation = (destination: string, time: number) => {
    addNotification({
      type: 'booking',
      title: 'Pod Booking Confirmed',
      message: `Your Smart Pod is en route to ${destination}. ETA: ${time} minutes.`,
      duration: 6000,
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    showWelcomeMessage,
    showArrivalMessage,
    showBookingConfirmation,
  };
};
