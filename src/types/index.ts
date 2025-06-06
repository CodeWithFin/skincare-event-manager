export interface Guest {
  id: string;
  name: string;
  phoneNumber: string;
  timeOfArrival: Date;
  skinConcern: string;
  interestedBrand: string;
  status: 'waiting' | 'in-service' | 'completed';
  serviceStartTime?: Date;
  serviceEndTime?: Date;
  queuePosition?: number;
}

export interface ServiceSession {
  id: string;
  guestId: string;
  guestName: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  skinConcern: string;
  interestedBrand: string;
}

export interface EventStats {
  totalGuests: number;
  guestsServed: number;
  averageServiceTime: number;
  mostRequestedSkinConcern: string;
  mostRequestedBrand: string;
  currentlyInService: number;
}

export const SKIN_CONCERNS = [
  'Acne',
  'Dryness',
  'Aging/Wrinkles',
  'Hyperpigmentation',
  'Sensitive Skin',
  'Oily Skin',
  'Dull Skin',
  'Dark Spots',
  'Rosacea',
  'Other'
] as const;

export const SKINCARE_BRANDS = [
  'CeraVe',
  'La Roche-Posay',
  'Neutrogena',
  'Olay',
  'Cetaphil',
  'The Ordinary',
  'Paula\'s Choice',
  'Drunk Elephant',
  'Glossier',
  'Fenty Skin',
  'Other'
] as const;

export type SkinConcern = typeof SKIN_CONCERNS[number];
export type SkincareBrand = typeof SKINCARE_BRANDS[number];
