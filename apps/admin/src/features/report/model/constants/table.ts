import { Reason } from '../../types';

export const REPORT_TABLE = [
  { key: 'id', label: 'ID', width: 'w-20' },
  { key: 'reporterId', label: '신고자 ID', width: 'w-20' },
  { key: 'reporterName', label: '신고자 이름', width: 'w-40' },
  { key: 'roomId', label: '모임 ID', width: 'w-20' },
  { key: 'roomTitle', label: '모임 제목', width: 'w-125' },
  { key: 'reason', label: '사유', width: 'w-50' },
  { key: 'reportDate', label: '신고 날짜', width: 'w-40' },
  { key: 'processed', label: '처리 여부', width: 'w-30' },
] as const;

export const REASON: Record<Reason, string> = {
  UNHEALTHY: '부적절한 내용',
  ADVERTISING: '광고 및 홍보',
  ABUSE: '욕설 및 비방',
  SPLASH: '도배',
  POLITICS: '정치적 발언',
  IMPERSONATION: '타인 사칭',
  ILLEGAL: '불법 행위',
};
