import { create } from 'zustand';

export interface DigitalTwin {
  id: string;
  name: string;
  appearance: {
    avatar: string;
    color: string;
  };
  traits: {
    energy: number;
    social: number;
    focus: number;
    adaptability: number;
  };
  wellnessGoals: {
    sleepHours: number;
    stepsPerDay: number;
    meditationMinutes: number;
  };
  preferences: {
    timezone: string;
    workStyle: 'focused' | 'collaborative' | 'flexible';
    mobilityPreference: 'eco' | 'speed' | 'comfort';
  };
}

export interface VitalSample {
  timestamp: number;
  heartRate: number;
  spo2: number;
  steps: number;
  mood: number;
  stress: number;
}

export interface EnvironmentData {
  timestamp: number;
  airQuality: number;
  temperature: number;
  noise: number;
  lighting: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'mobility' | 'social' | 'work' | 'environment';
  priority: 1 | 2 | 3;
  action?: {
    type: 'book_mobility' | 'schedule_break' | 'join_social' | 'adjust_environment';
    data?: any;
  };
}

export interface DigitalTwinState {
  twin: DigitalTwin | null;
  vitals: VitalSample | null;
  environment: EnvironmentData | null;
  recommendations: AIRecommendation[];
  isConnected: boolean;
  lastUpdate: number;
  
  // Actions
  setTwin: (twin: DigitalTwin) => void;
  updateVitals: (vitals: VitalSample) => void;
  updateEnvironment: (environment: EnvironmentData) => void;
  setRecommendations: (recommendations: AIRecommendation[]) => void;
  setConnected: (connected: boolean) => void;
  generateRecommendations: () => void;
}

// Mock data generators
const generateMockVitals = (): VitalSample => ({
  timestamp: Date.now(),
  heartRate: 70 + Math.random() * 30,
  spo2: 96 + Math.random() * 4,
  steps: Math.floor(Math.random() * 1000) + 5000,
  mood: Math.random(),
  stress: Math.random() * 0.8,
});

const generateMockEnvironment = (): EnvironmentData => ({
  timestamp: Date.now(),
  airQuality: 60 + Math.random() * 40,
  temperature: 20 + Math.random() * 10,
  noise: Math.random() * 0.8,
  lighting: Math.random(),
});

const generateMockRecommendations = (vitals?: VitalSample, environment?: EnvironmentData): AIRecommendation[] => {
  const recommendations: AIRecommendation[] = [];
  
  if (vitals?.heartRate && vitals.heartRate > 90) {
    recommendations.push({
      id: 'hr-high',
      title: 'Elevated Heart Rate Detected',
      description: 'Consider taking a 5-minute breathing exercise or a short walk in the park district.',
      category: 'health',
      priority: 2,
      action: { type: 'schedule_break' }
    });
  }

  if (vitals?.stress && vitals.stress > 0.7) {
    recommendations.push({
      id: 'stress-high',
      title: 'High Stress Levels',
      description: 'Virtual meditation session available in the Social Hub. Join now for instant calm.',
      category: 'health',
      priority: 1,
      action: { type: 'join_social', data: { location: 'Social Hub', activity: 'meditation' } }
    });
  }

  if (environment?.airQuality && environment.airQuality < 50) {
    recommendations.push({
      id: 'air-quality',
      title: 'Poor Air Quality Alert',
      description: 'Consider moving to the Climate-Controlled Office District or activating air purification.',
      category: 'environment',
      priority: 2,
      action: { type: 'book_mobility', data: { destination: 'Office District' } }
    });
  }

  if (vitals?.steps && vitals.steps < 3000) {
    recommendations.push({
      id: 'activity-low',
      title: 'Low Activity Today',
      description: 'Take a virtual tour of the city districts or join a walking group in the Social Hub.',
      category: 'health',
      priority: 3,
      action: { type: 'join_social', data: { activity: 'walking_group' } }
    });
  }

  // Always add at least one positive recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'wellness-check',
      title: 'Everything Looks Great!',
      description: 'Your vitals are optimal. Consider exploring new areas of the city or connecting with friends.',
      category: 'social',
      priority: 3,
      action: { type: 'join_social' }
    });
  }

  return recommendations;
};

export const useDigitalTwin = create<DigitalTwinState>((set, get) => ({
  twin: {
    id: 'twin-001',
    name: 'Digital You',
    appearance: {
      avatar: '🤖',
      color: 'hsl(200, 100%, 60%)',
    },
    traits: {
      energy: 0.8,
      social: 0.6,
      focus: 0.7,
      adaptability: 0.9,
    },
    wellnessGoals: {
      sleepHours: 8,
      stepsPerDay: 10000,
      meditationMinutes: 15,
    },
    preferences: {
      timezone: 'UTC',
      workStyle: 'focused',
      mobilityPreference: 'eco',
    },
  },
  vitals: generateMockVitals(),
  environment: generateMockEnvironment(),
  recommendations: [],
  isConnected: true,
  lastUpdate: Date.now(),

  setTwin: (twin) => set({ twin }),
  
  updateVitals: (vitals) => {
    set({ vitals, lastUpdate: Date.now() });
    get().generateRecommendations();
  },
  
  updateEnvironment: (environment) => {
    set({ environment, lastUpdate: Date.now() });
    get().generateRecommendations();
  },
  
  setRecommendations: (recommendations) => set({ recommendations }),
  
  setConnected: (isConnected) => set({ isConnected }),
  
  generateRecommendations: () => {
    const { vitals, environment } = get();
    const recommendations = generateMockRecommendations(vitals || undefined, environment || undefined);
    set({ recommendations });
  },
}));

// Auto-update vitals and environment every 5 seconds
if (typeof window !== 'undefined') {
  setInterval(() => {
    const store = useDigitalTwin.getState();
    if (store.isConnected) {
      store.updateVitals(generateMockVitals());
      
      // Update environment less frequently (every 30 seconds)
      if (Date.now() - store.lastUpdate > 30000) {
        store.updateEnvironment(generateMockEnvironment());
      }
    }
  }, 5000);
}