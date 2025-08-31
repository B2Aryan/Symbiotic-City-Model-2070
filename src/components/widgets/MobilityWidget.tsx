import { motion } from 'framer-motion';
import { Rocket, MapPin, Clock, Zap } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { useCityState } from '@/stores/useCityState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const MobilityWidget = () => {
  const { mobilityBookings, bookMobility, districts, currentDistrict } = useCityState();

  const activeBookings = mobilityBookings.filter(b => b.status !== 'arrived' && b.status !== 'cancelled');
  const currentDistrictInfo = districts.find(d => d.id === currentDistrict);

  const handleQuickBook = () => {
    const availableDistricts = districts.filter(d => d.id !== currentDistrict && d.available);
    if (availableDistricts.length > 0) {
      const randomDistrict = availableDistricts[Math.floor(Math.random() * availableDistricts.length)];
      bookMobility({
        origin: currentDistrictInfo?.name || 'Current Location',
        destination: randomDistrict.name,
        mode: 'pod',
        estimatedTime: 15 + Math.random() * 30
      });
    }
  };

  const statusColors = {
    scheduled: 'secondary',
    enroute: 'destructive',
    arrived: 'default',
    cancelled: 'outline'
  } as const;

  const modeIcons = {
    pod: '🚀',
    teleport: '⚡',
    walk: '🚶',
    fly: '🕊️'
  };

  return (
    <CyberCard glow="accent" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Rocket className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gradient-secondary">Smart Mobility</h3>
            <p className="text-sm text-muted-foreground">Seamless city navigation</p>
          </div>
        </div>
        <Button size="sm" onClick={handleQuickBook} className="glow-accent">
          Quick Travel
        </Button>
      </div>

      {/* Current Location */}
      <div className="mb-4 p-3 bg-gradient-surface rounded-lg border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">Current Location</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-primary">{currentDistrictInfo?.name}</p>
            <p className="text-xs text-muted-foreground">{currentDistrictInfo?.description}</p>
          </div>
          <div className="text-2xl">{currentDistrictInfo?.icon}</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {currentDistrictInfo?.population} citizens
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {currentDistrictInfo?.activities.length} activities
          </Badge>
        </div>
      </div>

      {/* Active Bookings */}
      {activeBookings.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Active Journeys
          </h4>
          <div className="space-y-2">
            {activeBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-card rounded-lg border border-border/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{modeIcons[booking.mode]}</div>
                    <div>
                      <p className="font-medium text-sm">{booking.destination}</p>
                      <p className="text-xs text-muted-foreground">
                        from {booking.origin}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusColors[booking.status]} className="text-xs mb-1">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      ETA: {Math.round(booking.estimatedTime)}min
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Destinations */}
      <div>
        <h4 className="font-medium mb-3">Popular Destinations</h4>
        <div className="grid grid-cols-2 gap-2">
          {districts
            .filter(d => d.id !== currentDistrict)
            .slice(0, 4)
            .map((district) => (
              <motion.button
                key={district.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => bookMobility({
                  origin: currentDistrictInfo?.name || 'Current Location',
                  destination: district.name,
                  mode: 'pod',
                  estimatedTime: 10 + Math.random() * 20
                })}
                className="p-3 bg-gradient-surface rounded-lg border border-border/50 hover:border-primary/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{district.icon}</span>
                  <Zap className="w-3 h-3 text-accent" />
                </div>
                <p className="font-medium text-xs">{district.name}</p>
                <p className="text-xs text-muted-foreground">{district.population} active</p>
              </motion.button>
            ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-mono font-bold text-accent">
              {Math.floor(Math.random() * 5) + 2}min
            </p>
            <p className="text-xs text-muted-foreground">Avg Travel</p>
          </div>
          <div>
            <p className="text-lg font-mono font-bold text-success">
              {mobilityBookings.length}
            </p>
            <p className="text-xs text-muted-foreground">Total Trips</p>
          </div>
          <div>
            <p className="text-lg font-mono font-bold text-primary">
              {districts.length}
            </p>
            <p className="text-xs text-muted-foreground">Districts</p>
          </div>
        </div>
      </div>
    </CyberCard>
  );
};