import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, Brain } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { useDigitalTwin } from '@/stores/useDigitalTwin';
import { cn } from '@/lib/utils';

interface VitalMetric {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export const VitalsWidget = () => {
  const { vitals, isConnected } = useDigitalTwin();
  const [metrics, setMetrics] = useState<VitalMetric[]>([]);

  useEffect(() => {
    if (!vitals) return;

    const newMetrics: VitalMetric[] = [
      {
        icon: Heart,
        label: 'Heart Rate',
        value: Math.round(vitals.heartRate).toString(),
        unit: 'bpm',
        status: vitals.heartRate > 100 ? 'warning' : vitals.heartRate > 120 ? 'critical' : 'optimal',
        trend: vitals.heartRate > 85 ? 'up' : vitals.heartRate < 65 ? 'down' : 'stable',
        color: vitals.heartRate > 100 ? 'text-warning' : 'text-success'
      },
      {
        icon: Activity,
        label: 'Blood Oxygen',
        value: Math.round(vitals.spo2).toString(),
        unit: '%',
        status: vitals.spo2 < 95 ? 'warning' : vitals.spo2 < 90 ? 'critical' : 'optimal',
        trend: 'stable',
        color: vitals.spo2 < 95 ? 'text-warning' : 'text-success'
      },
      {
        icon: TrendingUp,
        label: 'Steps Today',
        value: vitals.steps.toLocaleString(),
        unit: 'steps',
        status: vitals.steps < 5000 ? 'warning' : 'optimal',
        trend: vitals.steps > 8000 ? 'up' : 'stable',
        color: vitals.steps < 5000 ? 'text-warning' : 'text-success'
      },
      {
        icon: Brain,
        label: 'Stress Level',
        value: Math.round(vitals.stress * 100).toString(),
        unit: '%',
        status: vitals.stress > 0.7 ? 'critical' : vitals.stress > 0.5 ? 'warning' : 'optimal',
        trend: vitals.stress > 0.6 ? 'up' : 'down',
        color: vitals.stress > 0.7 ? 'text-destructive' : vitals.stress > 0.5 ? 'text-warning' : 'text-success'
      }
    ];

    setMetrics(newMetrics);
  }, [vitals]);

  if (!vitals) {
    return (
      <CyberCard glow="primary" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gradient-primary">Vital Signs</h3>
          <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="text-center text-muted-foreground">
          Connecting to biometric sensors...
        </div>
      </CyberCard>
    );
  }

  return (
    <CyberCard glow="primary" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gradient-primary">Vital Signs</h3>
        <div className={cn(
          "w-3 h-3 rounded-full",
          isConnected ? "bg-success pulse-glow" : "bg-destructive"
        )} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-surface rounded-lg p-4 border border-border/50"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={cn("w-5 h-5", metric.color)} />
              <div className="flex items-center gap-1">
                {metric.trend === 'up' && <TrendingUp className="w-3 h-3 text-success" />}
                {metric.trend === 'down' && <TrendingUp className="w-3 h-3 text-destructive rotate-180" />}
                {metric.trend === 'stable' && <div className="w-3 h-0.5 bg-muted rounded" />}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className={cn("text-xl font-mono font-bold", metric.color)}>
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>

            {/* Status indicator */}
            <div className="mt-2 flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                metric.status === 'optimal' && "bg-success",
                metric.status === 'warning' && "bg-warning",
                metric.status === 'critical' && "bg-destructive animate-pulse"
              )} />
              <span className={cn(
                "text-xs font-medium",
                metric.status === 'optimal' && "text-success",
                metric.status === 'warning' && "text-warning", 
                metric.status === 'critical' && "text-destructive"
              )}>
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last update: {new Date(vitals.timestamp).toLocaleTimeString()}</span>
          <span>Next sync: {Math.floor(Math.random() * 5) + 1}s</span>
        </div>
      </div>
    </CyberCard>
  );
};