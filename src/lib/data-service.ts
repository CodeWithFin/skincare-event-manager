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

// Real-time queue listener with notifications
export const subscribeToQueue = (callback: (guests: Guest[]) => void) => {
  listeners.push(callback);
  
  // Send initial data
  callback([...guests]);
  
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
};

// Subscribe to specific guest updates (for notifications)
export const subscribeToGuestUpdates = (guestId: string, callback: (guest: Guest | null) => void) => {
  const guestListener = (allGuests: Guest[]) => {
    const guest = allGuests.find(g => g.id === guestId);
    callback(guest || null);
  };
  
  listeners.push(guestListener);
  
  // Send initial data
  const currentGuest = guests.find(g => g.id === guestId);
  callback(currentGuest || null);
  
  // Return unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== guestListener);
  };
};

// Get guest by ID
export const getGuestById = async (guestId: string): Promise<Guest | null> => {
  return guests.find(g => g.id === guestId) || null;
};

// Check if guest is next in line
export const isGuestNext = (guestId: string): boolean => {
  const guest = guests.find(g => g.id === guestId);
  return guest?.queuePosition === 1 && guest?.status === 'waiting';
};

// Get estimated wait time for a guest
export const getEstimatedWaitTime = (guestId: string): number => {
  const guest = guests.find(g => g.id === guestId);
  if (!guest || guest.status !== 'waiting' || !guest.queuePosition) return 0;
  
  // Estimate 15 minutes per person ahead in queue
  const AVERAGE_SERVICE_TIME = 15; // minutes
  return Math.max(0, (guest.queuePosition - 1) * AVERAGE_SERVICE_TIME);
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

// Real data only - no mock data
