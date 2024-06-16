export interface TCar {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status?: 'available'|'unavailable'|'in_maintenance'; 
    features: string[];
    pricePerHour: number;
    isDeleted?: boolean;
  }
