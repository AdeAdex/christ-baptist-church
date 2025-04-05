interface CreatedByProps {
  _id: string; 
  firstName: string; 
  lastName: string; 
}


export interface Contribution {
  _id?: string;
  memberId: string;
  amount: number;
  week: number;
  month: string;
  year: number;
  type: string; // e.g., "Tithe", "Offering", etc.
  status: string; // e.g., "Pending", "Completed", etc.
  paymentMethod: string; // e.g., "Cash", "Bank Transfer"
  description?: string; // Optional description for the contribution
  createdBy: CreatedByProps; // Who created the contribution (e.g., "Admin", "System")
  createdAt?: Date; // Optional, if you want to track when the contribution was created
}
