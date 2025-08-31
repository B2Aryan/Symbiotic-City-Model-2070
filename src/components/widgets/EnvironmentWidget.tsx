import { motion } from 'framer-motion';
import { Cloud, Thermometer, Wind, Eye, AlertTriangle } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { useDigitalTwin } from '@/stores/useDigitalTwin';
import { useCityState } from '@/stores/useCityState';

export const EnvironmentWidget = () => {
  const { environment } = useDigitalTwin();
  const { environment: cityEnv } = useCityState();

  if (!environment) {
    return (
      <CyberCard glow="secondary" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gradient-secondary">Environment</h3>
          <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="text-center text-muted-foreground">
          Loading environmental data...
        </div>
      </CyberCard>
    );
  }

  const airQualityStatus = environment.airQuality > 80 ? 'excellent' : 
                          environment.airQuality > 60 ? 'good' : 
                          environment.airQuality > 40 ? 'moderate' : 'poor';
  
  const airQualityColor = environment.airQuality > 80 ? 'text-success' : 
                         environment.airQuality > 60 ? 'text-success' : 
                         environment.airQuality > 40 ? 'text-warning' : 'text-destructive';

  const metrics = [
    {
      icon: Cloud,
      label: 'Air Quality',
      value: Math.round(environment.airQuality),
      unit: 'AQI',
      status: airQualityStatus,
      color: airQualityColor,
      description: 'Real-time pollution monitoring'
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: Math.round(cityEnv.temperature),
      unit: '°C',
      status: cityEnv.temperature > 25 ? 'warm' : cityEnv.temperature < 18 ? 'cool' : 'comfortable',
      color: cityEnv.temperature > 25 ? 'text-warning' : cityEnv.temperature < 18 ? 'text-primary' : 'text-success',
      description: 'Climate-controlled zones'
    },
    {
      icon: Wind,
      label: 'Noise Level',
      value: Math.round(environment.noise * 100),
      unit: '%',
      status: environment.noise > 0.7 ? 'loud' : environment.noise > 0.4 ? 'moderate' : 'quiet',
      color: environment.noise > 0.7 ? 'text-destructive' : environment.noise > 0.4 ? 'text-warning' : 'text-success',
      description: 'Urban sound monitoring'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: Math.round(cityEnv.ambientLighting * 100),
      unit: '%',
      status: cityEnv.ambientLighting > 0.8 ? 'excellent' : cityEnv.ambientLighting > 0.5 ? 'good' : 'limited',
      color: 'text-primary',
      description: 'Atmospheric conditions'
    }
  ];

  const hasWarnings = environment.airQuality < 50 || environment.noise > 0.7;

  return (
    <CyberCard glow="secondary" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gradient-secondary">Environment</h3>
        <div className="flex items-center gap-2">
          {hasWarnings && (
            <AlertTriangle className="w-4 h-4 text-warning animate-pulse" />
          )}
          <div className="w-3 h-3 rounded-full bg-success pulse-glow" />
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gradient-surface rounded-lg border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-card">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div>
                <p className="font-medium">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className={`text-lg font-mono font-bold ${metric.color}`}>
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
              <p className={`text-xs font-medium ${metric.color}`}>
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weather summary */}
      <div className="mt-4 p-3 bg-gradient-glow rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-primary">Current Conditions</p>
            <p className="text-sm text-muted-foreground">
              {cityEnv.weather.charAt(0).toUpperCase() + cityEnv.weather.slice(1)} • 
              Time: {Math.floor(cityEnv.timeOfDay)}:{String(Math.floor((cityEnv.timeOfDay % 1) * 60)).padStart(2, '0')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-primary">
              Wind: {Math.round(cityEnv.wind * 100)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last update: {new Date(environment.timestamp).toLocaleTimeString()}</span>
          <span>Sensors: Online</span>
        </div>
      </div>
    </CyberCard>
  );
};