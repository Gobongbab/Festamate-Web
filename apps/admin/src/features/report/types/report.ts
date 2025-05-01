export type Report = {
  id: number;
  reporterId: number;
  reporterName: string;
  roomId: number;
  roomTitle: string;
  reason: Reason;
  reportDate: string;
  processed: boolean;
};

export type Reason =
  | 'UNHEALTHY'
  | 'ADVERTISING'
  | 'ABUSE'
  | 'SPLASH'
  | 'POLITICS'
  | 'IMPERSONATION'
  | 'ILLEGAL';
