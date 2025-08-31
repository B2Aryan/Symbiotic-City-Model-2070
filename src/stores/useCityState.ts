import { create } from 'zustand';

export interface District {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  color: string;
  icon: string;
  available: boolean;
  population: number;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: 'work' | 'social' | 'health' | 'entertainment' | 'transport';
  duration: number;
  capacity: number;
  currentParticipants: number;
  startsAt?: number;
}

export interface MobilityBooking {
  id: string;
  origin: string;
  destination: string;
  mode: 'pod' | 'teleport' | 'walk' | 'fly';
  status: 'scheduled' | 'enroute' | 'arrived' | 'cancelled';
  estimatedTime: number;
  bookedAt: number;
  startTime?: number;
}

export interface CityEnvironment {
  timeOfDay: number; // 0-24
  weather: 'sunny' | 'cloudy' | 'rainy' | 'foggy' | 'aurora';
  temperature: number;
  wind: number;
  ambientLighting: number;
}

export interface CityState {
  currentDistrict: string;
  playerPosition: [number, number, number];
  environment: CityEnvironment;
  districts: District[];
  mobilityBookings: MobilityBooking[];
  isVRMode: boolean;
  simulationSpeed: number;
  
  // Actions
  setCurrentDistrict: (districtId: string) => void;
  setPlayerPosition: (position: [number, number, number]) => void;
  updateEnvironment: (environment: Partial<CityEnvironment>) => void;
  bookMobility: (booking: Omit<MobilityBooking, 'id' | 'bookedAt' | 'status'>) => string;
  updateBookingStatus: (bookingId: string, status: MobilityBooking['status']) => void;
  joinActivity: (districtId: string, activityId: string) => void;
  toggleVRMode: () => void;
  setSimulationSpeed: (speed: number) => void;
}

const initialDistricts: District[] = [
  {
    id: 'home',
    name: 'Home District',
    description: 'Your personal sanctuary with smart home automation and wellness monitoring.',
    position: [0, 0, 0],
    color: 'hsl(140, 100%, 60%)',
    icon: '🏠',
    available: true,
    population: 1,
    activities: [
      {
        id: 'sleep',
        name: 'Rest & Recovery',
        description: 'Optimize your sleep with AI-guided environment control.',
        type: 'health',
        duration: 480,
        capacity: 1,
        currentParticipants: 0,
      },
      {
        id: 'workout',
        name: 'Personal Fitness',
        description: 'VR fitness routines tailored to your health goals.',
        type: 'health',
        duration: 45,
        capacity: 1,
        currentParticipants: 0,
      },
    ],
  },
  {
    id: 'office',
    name: 'Office District',
    description: 'Collaborative workspaces with AI productivity enhancement.',
    position: [50, 0, 0],
    color: 'hsl(200, 100%, 60%)',
    icon: '🏢',
    available: true,
    population: 247,
    activities: [
      {
        id: 'meeting',
        name: 'Team Sync',
        description: 'Virtual collaboration session with global team members.',
        type: 'work',
        duration: 60,
        capacity: 8,
        currentParticipants: 3,
        startsAt: Date.now() + 1800000, // 30 minutes from now
      },
      {
        id: 'focus',
        name: 'Deep Work Session',
        description: 'Noise-cancelling environment for concentrated work.',
        type: 'work',
        duration: 120,
        capacity: 50,
        currentParticipants: 12,
      },
    ],
  },
  {
    id: 'social',
    name: 'Social Hub',
    description: 'Community spaces for connection, learning, and entertainment.',
    position: [0, 0, 50],
    color: 'hsl(270, 80%, 60%)',
    icon: '🎭',
    available: true,
    population: 892,
    activities: [
      {
        id: 'meditation',
        name: 'Group Meditation',
        description: 'Guided mindfulness session in virtual nature environments.',
        type: 'health',
        duration: 20,
        capacity: 100,
        currentParticipants: 23,
        startsAt: Date.now() + 600000, // 10 minutes from now
      },
      {
        id: 'concert',
        name: 'Virtual Concert',
        description: 'Live performance by AI-human collaborative musicians.',
        type: 'entertainment',
        duration: 90,
        capacity: 5000,
        currentParticipants: 1247,
        startsAt: Date.now() + 3600000, // 1 hour from now
      },
    ],
  },
  {
    id: 'clinic',
    name: 'Health Clinic',
    description: 'Advanced health monitoring and preventive care facilities.',
    position: [-50, 0, 0],
    color: 'hsl(0, 100%, 60%)',
    icon: '🏥',
    available: true,
    population: 156,
    activities: [
      {
        id: 'checkup',
        name: 'Health Assessment',
        description: 'Comprehensive biometric analysis and wellness planning.',
        type: 'health',
        duration: 30,
        capacity: 20,
        currentParticipants: 8,
      },
      {
        id: 'consultation',
        name: 'AI Health Advisor',
        description: 'Personalized health guidance based on your digital twin data.',
        type: 'health',
        duration: 15,
        capacity: 1,
        currentParticipants: 0,
      },
    ],
  },
];

export const useCityState = create<CityState>((set, get) => ({
  currentDistrict: 'home',
  playerPosition: [0, 2, 0],
  environment: {
    timeOfDay: 14.5, // 2:30 PM
    weather: 'sunny',
    temperature: 22,
    wind: 0.3,
    ambientLighting: 0.8,
  },
  districts: initialDistricts,
  mobilityBookings: [],
  isVRMode: false,
  simulationSpeed: 1,

  setCurrentDistrict: (districtId) => set({ currentDistrict: districtId }),
  
  setPlayerPosition: (position) => set({ playerPosition: position }),
  
  updateEnvironment: (environment) => 
    set((state) => ({ 
      environment: { ...state.environment, ...environment } 
    })),
  
  bookMobility: (booking) => {
    const id = `booking-${Date.now()}`;
    const newBooking: MobilityBooking = {
      ...booking,
      id,
      bookedAt: Date.now(),
      status: 'scheduled',
    };
    
    set((state) => ({
      mobilityBookings: [...state.mobilityBookings, newBooking]
    }));
    
    // Simulate mobility progress
    setTimeout(() => {
      get().updateBookingStatus(id, 'enroute');
      setTimeout(() => {
        get().updateBookingStatus(id, 'arrived');
      }, booking.estimatedTime * 1000);
    }, 2000);
    
    return id;
  },
  
  updateBookingStatus: (bookingId, status) =>
    set((state) => ({
      mobilityBookings: state.mobilityBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      ),
    })),
  
  joinActivity: (districtId, activityId) =>
    set((state) => ({
      districts: state.districts.map((district) =>
        district.id === districtId
          ? {
              ...district,
              activities: district.activities.map((activity) =>
                activity.id === activityId
                  ? { ...activity, currentParticipants: activity.currentParticipants + 1 }
                  : activity
              ),
            }
          : district
      ),
    })),
  
  toggleVRMode: () => set((state) => ({ isVRMode: !state.isVRMode })),
  
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
}));

// Auto-update time of day
if (typeof window !== 'undefined') {
  setInterval(() => {
    const state = useCityState.getState();
    const newTime = (state.environment.timeOfDay + 0.1 * state.simulationSpeed) % 24;
    state.updateEnvironment({ timeOfDay: newTime });
  }, 10000); // Update every 10 seconds
}