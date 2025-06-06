// Mock data service - Replace with Supabase later
import { Guest, ServiceSession, EventStats } from '@/types';

// In-memory storage (will be replaced with Supabase)
let guests: Guest[] = [];
const sessions: ServiceSession[] = [];
let listeners: Array<(guests: Guest[]) => void> = [];

// Generate unique IDs
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Guest management functions
export const addGuest = async (guestData: Omit<Guest, 'id' | 'status' | 'queuePosition'>): Promise<string> => {
  try {
    const newGuest: Guest = {
      ...guestData,
      id: generateId(),
      status: 'waiting',
      queuePosition: 0 // Will be calculated
    };
    
    guests.push(newGuest);
    updateQueuePositions();
    notifyListeners();
    
    return newGuest.id;
  } catch (error) {
    console.error('Error adding guest:', error);
    throw error;
  }
};

export const updateGuestStatus = async (
  guestId: string, 
  status: Guest['status'], 
  additionalData?: Partial<Guest>
): Promise<void> => {
  try {
    const guestIndex = guests.findIndex(g => g.id === guestId);
    if (guestIndex === -1) {
      throw new Error('Guest not found');
    }
    
    guests[guestIndex] = {
      ...guests[guestIndex],
      status,
      ...additionalData
    };
    
    updateQueuePositions();
    notifyListeners();
  } catch (error) {
    console.error('Error updating guest status:', error);
    throw error;
  }
};

export const deleteGuest = async (guestId: string): Promise<void> => {
  try {
    guests = guests.filter(g => g.id !== guestId);
    updateQueuePositions();
    notifyListeners();
  } catch (error) {
    console.error('Error deleting guest:', error);
    throw error;
  }
};

// Real-time queue listener (mock)
export const subscribeToQueue = (callback: (guests: Guest[]) => void) => {
  listeners.push(callback);
  
  // Send initial data
  callback([...guests]);
  
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
};

// Helper functions
const updateQueuePositions = () => {
  const waitingGuests = guests.filter(g => g.status === 'waiting');
  waitingGuests.sort((a, b) => a.timeOfArrival.getTime() - b.timeOfArrival.getTime());
  
  waitingGuests.forEach((guest, index) => {
    guest.queuePosition = index + 1;
  });
};

const notifyListeners = () => {
  listeners.forEach(callback => callback([...guests]));
};

// Service session management
export const createServiceSession = async (guest: Guest): Promise<string> => {
  try {
    const session: ServiceSession = {
      id: generateId(),
      guestId: guest.id,
      guestName: guest.name,
      startTime: new Date(),
      skinConcern: guest.skinConcern,
      interestedBrand: guest.interestedBrand
    };
    
    sessions.push(session);
    return session.id;
  } catch (error) {
    console.error('Error creating service session:', error);
    throw error;
  }
};

export const updateServiceSession = async (
  sessionId: string, 
  updates: Partial<ServiceSession>
): Promise<void> => {
  try {
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) {
      throw new Error('Session not found');
    }
    
    sessions[sessionIndex] = {
      ...sessions[sessionIndex],
      ...updates
    };
  } catch (error) {
    console.error('Error updating service session:', error);
    throw error;
  }
};

// Analytics functions
export const calculateEventStats = async (): Promise<EventStats> => {
  try {
    const totalGuests = guests.length;
    const completedSessions = sessions.filter(s => s.endTime);
    const currentlyServing = guests.filter(g => g.status === 'in-service').length;
    
    // Calculate average service time
    const avgServiceTime = completedSessions.length > 0 
      ? completedSessions.reduce((sum, session) => {
          if (session.endTime && session.startTime) {
            return sum + (session.endTime.getTime() - session.startTime.getTime());
          }
          return sum;
        }, 0) / completedSessions.length
      : 0;
    
    // Calculate brand interest distribution
    const brandInterests: Record<string, number> = {};
    guests.forEach(guest => {
      if (guest.interestedBrand) {
        brandInterests[guest.interestedBrand] = (brandInterests[guest.interestedBrand] || 0) + 1;
      }
    });
    
    // Calculate skin concern distribution
    const skinConcerns: Record<string, number> = {};
    guests.forEach(guest => {
      if (guest.skinConcern) {
        skinConcerns[guest.skinConcern] = (skinConcerns[guest.skinConcern] || 0) + 1;
      }
    });
    
    // Find most requested items
    const mostRequestedSkinConcern = Object.keys(skinConcerns).reduce((a, b) => 
      skinConcerns[a] > skinConcerns[b] ? a : b, Object.keys(skinConcerns)[0] || 'Acne'
    );
    
    const mostRequestedBrand = Object.keys(brandInterests).reduce((a, b) => 
      brandInterests[a] > brandInterests[b] ? a : b, Object.keys(brandInterests)[0] || 'CeraVe'
    );
    
    return {
      totalGuests,
      guestsServed: completedSessions.length,
      averageServiceTime: Math.round(avgServiceTime / 1000 / 60), // Convert to minutes
      mostRequestedSkinConcern,
      mostRequestedBrand,
      currentlyInService: currentlyServing
    };
  } catch (error) {
    console.error('Error calculating event stats:', error);
    throw error;
  }
};

// Mock some initial data for development
if (typeof window !== 'undefined') {
  // Only run in browser
  guests = [
    {
      id: '1',
      name: 'Sarah Johnson',
      phoneNumber: '+1234567890',
      skinConcern: 'Acne',
      interestedBrand: 'CeraVe',
      timeOfArrival: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'waiting',
      queuePosition: 1
    },
    {
      id: '2',
      name: 'Mike Chen',
      phoneNumber: '+1234567891',
      skinConcern: 'Dryness',
      interestedBrand: 'La Roche-Posay',
      timeOfArrival: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      status: 'in-service',
      queuePosition: 0,
      serviceStartTime: new Date(Date.now() - 10 * 60 * 1000)
    }
  ];
}
