export interface Contribution {
  _id?: string;
  memberId: string;
  amount: number;
  week: number;
  month: string;
  year: number;
  contributedBy?: string; 
}
