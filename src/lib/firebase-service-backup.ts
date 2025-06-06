import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Guest, ServiceSession, EventStats } from '@/types';

const GUESTS_COLLECTION = 'guests';
const SESSIONS_COLLECTION = 'service-sessions';

// Guest management functions
export const addGuest = async (guestData: Omit<Guest, 'id' | 'status' | 'queuePosition'>) => {
  try {
    const docRef = await addDoc(collection(db, GUESTS_COLLECTION), {
      ...guestData,
      timeOfArrival: Timestamp.fromDate(guestData.timeOfArrival),
      status: 'waiting'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding guest:', error);
    throw error;
  }
};

export const updateGuestStatus = async (guestId: string, status: Guest['status'], additionalData?: Partial<Guest>) => {
  try {
    const guestRef = doc(db, GUESTS_COLLECTION, guestId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { status };
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        if (additionalData[key as keyof Guest] instanceof Date) {
          updateData[key] = Timestamp.fromDate(additionalData[key as keyof Guest] as Date);
        } else {
          updateData[key] = additionalData[key as keyof Guest];
        }
      });
    }
    
    await updateDoc(guestRef, updateData);
  } catch (error) {
    console.error('Error updating guest status:', error);
    throw error;
  }
};

export const deleteGuest = async (guestId: string) => {
  try {
    await deleteDoc(doc(db, GUESTS_COLLECTION, guestId));
  } catch (error) {
    console.error('Error deleting guest:', error);
    throw error;
  }
};

// Real-time queue listener
export const subscribeToQueue = (callback: (guests: Guest[]) => void) => {
  const q = query(collection(db, GUESTS_COLLECTION), orderBy('timeOfArrival'));
  
  return onSnapshot(q, (snapshot) => {
    const guests: Guest[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      guests.push({
        id: doc.id,
        ...data,
        timeOfArrival: data.timeOfArrival.toDate(),
        serviceStartTime: data.serviceStartTime?.toDate(),
        serviceEndTime: data.serviceEndTime?.toDate(),
      } as Guest);
    });
    
    // Add queue positions
    const waitingGuests = guests.filter(g => g.status === 'waiting');
    waitingGuests.forEach((guest, index) => {
      guest.queuePosition = index + 1;
    });
    
    callback(guests);
  });
};

// Service session management
export const createServiceSession = async (guest: Guest) => {
  try {
    const sessionData: Omit<ServiceSession, 'id'> = {
      guestId: guest.id,
      guestName: guest.name,
      startTime: new Date(),
      skinConcern: guest.skinConcern,
      interestedBrand: guest.interestedBrand
    };
    
    const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
      ...sessionData,
      startTime: Timestamp.fromDate(sessionData.startTime)
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating service session:', error);
    throw error;
  }
};

export const completeServiceSession = async (sessionId: string) => {
  try {
    const endTime = new Date();
    const sessionRef = doc(db, SESSIONS_COLLECTION, sessionId);
    await updateDoc(sessionRef, {
      endTime: Timestamp.fromDate(endTime)
    });
  } catch (error) {
    console.error('Error completing service session:', error);
    throw error;
  }
};

// Analytics and stats
export const calculateEventStats = async (): Promise<EventStats> => {
  try {
    const [guestsSnapshot, sessionsSnapshot] = await Promise.all([
      getDocs(collection(db, GUESTS_COLLECTION)),
      getDocs(collection(db, SESSIONS_COLLECTION))
    ]);
    
    const guests: Guest[] = [];
    guestsSnapshot.forEach((doc) => {
      const data = doc.data();
      guests.push({
        id: doc.id,
        ...data,
        timeOfArrival: data.timeOfArrival.toDate(),
        serviceStartTime: data.serviceStartTime?.toDate(),
        serviceEndTime: data.serviceEndTime?.toDate(),
      } as Guest);
    });
    
    const sessions: ServiceSession[] = [];
    sessionsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.endTime) {
        const startTime = data.startTime.toDate();
        const endTime = data.endTime.toDate();
        sessions.push({
          id: doc.id,
          ...data,
          startTime,
          endTime,
          duration: Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
        } as ServiceSession);
      }
    });
    
    const totalGuests = guests.length;
    const guestsServed = guests.filter(g => g.status === 'completed').length;
    const currentlyInService = guests.filter(g => g.status === 'in-service').length;
    
    const averageServiceTime = sessions.length > 0 
      ? Math.round(sessions.reduce((sum, session) => sum + (session.duration || 0), 0) / sessions.length)
      : 0;
    
    // Calculate most requested items
    const skinConcernCounts: { [key: string]: number } = {};
    const brandCounts: { [key: string]: number } = {};
    
    guests.forEach(guest => {
      skinConcernCounts[guest.skinConcern] = (skinConcernCounts[guest.skinConcern] || 0) + 1;
      brandCounts[guest.interestedBrand] = (brandCounts[guest.interestedBrand] || 0) + 1;
    });
    
    const mostRequestedSkinConcern = Object.keys(skinConcernCounts).reduce((a, b) => 
      skinConcernCounts[a] > skinConcernCounts[b] ? a : b, Object.keys(skinConcernCounts)[0] || 'None'
    );
    
    const mostRequestedBrand = Object.keys(brandCounts).reduce((a, b) => 
      brandCounts[a] > brandCounts[b] ? a : b, Object.keys(brandCounts)[0] || 'None'
    );
    
    return {
      totalGuests,
      guestsServed,
      averageServiceTime,
      mostRequestedSkinConcern,
      mostRequestedBrand,
      currentlyInService
    };
  } catch (error) {
    console.error('Error calculating event stats:', error);
    throw error;
  }
};
