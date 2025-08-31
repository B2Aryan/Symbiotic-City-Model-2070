import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { useDigitalTwin } from '@/stores/useDigitalTwin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const AITwinPanel = () => {
  const { twin, recommendations, vitals, environment } = useDigitalTwin();

  const priorityColors = {
    1: 'destructive',
    2: 'destructive', 
    3: 'secondary'
  } as const;

  const priorityLabels = {
    1: 'Critical',
    2: 'Important',
    3: 'Suggestion'
  } as const;

  const categoryIcons = {
    health: '❤️',
    mobility: '🚀',
    social: '👥',
    work: '💼',
    environment: '🌍'
  };

  const handleActionClick = (recommendation: any) => {
    // Simulate action execution
    console.log('Executing action:', recommendation.action);
    // In a real app, this would trigger the appropriate action
  };

  return (
    <CyberCard glow="accent" className="p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <Bot className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gradient-primary">AI Twin Assistant</h3>
          <p className="text-sm text-muted-foreground">
            {twin?.name || 'Digital You'} • Analyzing your patterns
          </p>
        </div>
        <div className="ml-auto">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>
      </div>

      {/* Current Status Summary */}
      <div className="mb-6 p-4 bg-gradient-surface rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-4 h-4 text-success" />
          <span className="font-medium text-success">AI Analysis Complete</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on your current vitals and environment, I've identified {recommendations.length} optimization opportunities.
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span>♥ {vitals ? Math.round(vitals.heartRate) : '--'} bpm</span>
          <span>🌡 {environment ? Math.round(environment.temperature) : '--'}°C</span>
          <span>🎯 {vitals ? Math.round(vitals.mood * 100) : '--'}% mood</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Smart Recommendations</h4>
          <Badge variant="outline" className="text-xs">
            {recommendations.length} active
          </Badge>
        </div>

        <AnimatePresence>
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="text-xl">{categoryIcons[rec.category]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-medium text-sm">{rec.title}</h5>
                    <Badge 
                      variant={priorityColors[rec.priority]}
                      className="text-xs"
                    >
                      {priorityLabels[rec.priority]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  
                  {rec.action && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleActionClick(rec)}
                      className="text-xs h-7"
                    >
                      Take Action
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              All systems optimal! I'll notify you of any recommendations.
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Clock className="w-3 h-3 mr-2" />
            Schedule
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Status footer */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>AI Twin Active</span>
          </div>
          <span>Learning from your patterns...</span>
        </div>
      </div>
    </CyberCard>
  );
};