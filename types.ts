
export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  college: string;
  department: string;
  photoUrl?: string;
}

export enum PassStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
}

export interface BusPass {
  id: string;
  userId: string;
  routeFrom: string;
  routeTo: string;
  expiryDate: string;
  issueDate: string;
  status: PassStatus;
  qrCode: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  type: 'New' | 'Renewal';
  status: 'Successful' | 'Failed';
  passId: string;
}
