import { motion } from 'framer-motion';
import { Users, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { useCityState } from '@/stores/useCityState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SocialWidget = () => {
  const { districts } = useCityState();

  // Mock social data
  const upcomingEvents = [
    {
      id: 'event-1',
      name: 'Virtual Concert',
      time: new Date(Date.now() + 3600000), // 1 hour from now
      location: 'Social Hub',
      attendees: 1247,
      type: 'entertainment'
    },
    {
      id: 'event-2', 
      name: 'Group Meditation',
      time: new Date(Date.now() + 600000), // 10 minutes from now
      location: 'Social Hub',
      attendees: 23,
      type: 'wellness'
    },
    {
      id: 'event-3',
      name: 'Tech Talk: AI Ethics',
      time: new Date(Date.now() + 7200000), // 2 hours from now
      location: 'Office District',
      attendees: 89,
      type: 'education'
    }
  ];

  const friends = [
    { name: 'Alex Chen', status: 'Office District', avatar: '👨‍💻', online: true },
    { name: 'Maya Patel', status: 'Social Hub', avatar: '👩‍🎨', online: true },
    { name: 'Jordan Kim', status: 'Home District', avatar: '👨‍🚀', online: false },
    { name: 'Zara Ali', status: 'Health Clinic', avatar: '👩‍⚕️', online: true }
  ];

  const eventTypeColors = {
    entertainment: 'destructive',
    wellness: 'secondary',
    education: 'default'
  } as const;

  const eventIcons = {
    entertainment: '🎵',
    wellness: '🧘',
    education: '📚'
  };

  const getTimeUntil = (date: Date) => {
    const diff = date.getTime() - Date.now();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <CyberCard glow="secondary" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary/20">
            <Users className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gradient-secondary">Social Network</h3>
            <p className="text-sm text-muted-foreground">Connect & collaborate</p>
          </div>
        </div>
        <Button size="sm" variant="outline">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>
      </div>

      {/* Upcoming Events */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4" />
          <h4 className="font-medium">Upcoming Events</h4>
        </div>
        <div className="space-y-2">
          {upcomingEvents.slice(0, 2).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gradient-surface rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{eventIcons[event.type]}</span>
                  <div>
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <Badge variant={eventTypeColors[event.type]} className="text-xs">
                  {getTimeUntil(event.time)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {event.attendees} attending
                  </span>
                </div>
                <Button size="sm" variant="outline" className="h-6 text-xs">
                  Join
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Friends Online */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4" />
          <h4 className="font-medium">Friends</h4>
          <Badge variant="outline" className="text-xs ml-auto">
            {friends.filter(f => f.online).length} online
          </Badge>
        </div>
        <div className="space-y-2">
          {friends.slice(0, 3).map((friend, index) => (
            <motion.div
              key={friend.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gradient-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-lg">{friend.avatar}</span>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                    friend.online ? 'bg-success' : 'bg-muted'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">{friend.status}</p>
                </div>
              </div>
              {friend.online && (
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <MessageCircle className="w-3 h-3" />
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Stats */}
      <div className="pt-4 border-t border-border/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-mono font-bold text-secondary">
              {friends.filter(f => f.online).length}
            </p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <div>
            <p className="text-lg font-mono font-bold text-accent">
              {upcomingEvents.length}
            </p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
          <div>
            <p className="text-lg font-mono font-bold text-primary">
              {Math.floor(Math.random() * 20) + 5}
            </p>
            <p className="text-xs text-muted-foreground">Messages</p>
          </div>
        </div>
      </div>
    </CyberCard>
  );
};