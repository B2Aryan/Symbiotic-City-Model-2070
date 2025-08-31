import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, MapPin, Users, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface PodBookingWidgetProps {
  onBookPod: () => void;
}

interface PodStatus {
  id: string;
  status: 'available' | 'in-use' | 'maintenance';
  location: string;
  destination: string;
  eta: string;
}

const podStatuses: PodStatus[] = [
  {
    id: 'pod-1',
    status: 'available',
    location: 'Central Hub',
    destination: 'Office District',
    eta: '2 min'
  },
  {
    id: 'pod-2',
    status: 'available',
    location: 'Residential Zone',
    destination: 'Social Hub',
    eta: '1 min'
  },
  {
    id: 'pod-3',
    status: 'in-use',
    location: 'Learning Center',
    destination: 'Health Clinic',
    eta: '5 min'
  },
  {
    id: 'pod-4',
    status: 'maintenance',
    location: 'Entertainment District',
    destination: 'N/A',
    eta: 'N/A'
  }
];

export const SmartPodBookingWidget = ({ onBookPod }: PodBookingWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const availablePods = podStatuses.filter(pod => pod.status === 'available').length;
  const totalPods = podStatuses.length;

  const getStatusColor = (status: PodStatus['status']) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'in-use':
        return 'text-warning';
      case 'maintenance':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: PodStatus['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-3 h-3" />;
      case 'in-use':
        return <Clock className="w-3 h-3" />;
      case 'maintenance':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <CyberCard glow="primary" className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gradient-primary">Smart Pod Booking</h3>
            <p className="text-sm text-muted-foreground">Mobility on demand</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-primary">
            {availablePods}/{totalPods}
          </div>
          <div className="text-xs text-muted-foreground">Pods Available</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gradient-surface rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground">Avg Wait</span>
          </div>
          <div className="text-lg font-mono font-bold text-primary">1.2 min</div>
        </div>
        <div className="p-3 bg-gradient-surface rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-3 h-3 text-accent" />
            <span className="text-xs text-muted-foreground">Coverage</span>
          </div>
          <div className="text-lg font-mono font-bold text-accent">98%</div>
        </div>
      </div>

      {/* Pod Status List */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Pod Status</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary-glow transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </button>
        </div>
        
        <div className="space-y-2">
          {podStatuses.slice(0, isExpanded ? undefined : 2).map((pod) => (
            <motion.div
              key={pod.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-2 bg-gradient-surface rounded-lg border border-border/50"
            >
              <div className="flex items-center gap-2">
                <div className={cn("flex items-center gap-1", getStatusColor(pod.status))}>
                  {getStatusIcon(pod.status)}
                  <span className="text-xs font-medium">{pod.id}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{pod.location}</div>
                <div className="text-xs font-medium">{pod.eta}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Booking */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Quick Book</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>Popular routes</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBookPod}
            className="justify-between border-border/50 hover:border-primary/50"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">Office Hub</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>2 min</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBookPod}
            className="justify-between border-border/50 hover:border-primary/50"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">Social Hub</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>1 min</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </Button>
        </div>
        
        <Button
          onClick={onBookPod}
          className="w-full glow-primary"
          size="sm"
        >
          <Zap className="w-4 h-4 mr-2" />
          Book Smart Pod
        </Button>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last update: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>System Active</span>
          </div>
        </div>
      </div>
    </CyberCard>
  );
};
