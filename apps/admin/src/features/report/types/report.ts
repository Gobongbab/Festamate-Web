export type Report = {
  id: number;
  reporterId: number;
  reporterName: string;
  roomId: number;
  roomTitle: string;
  reason: string;
  reportDate: string;
  processed: boolean;
};
