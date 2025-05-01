export const REPORT_COLUMNS = [
  { key: 'id', label: 'ID', width: 'w-[80px]' },
  { key: 'reporterId', label: '신고자 ID', width: 'w-[80px]' },
  { key: 'reporterName', label: '신고자 이름', width: 'w-[150px]' },
  { key: 'roomId', label: '모임 ID', width: 'w-[80px]' },
  { key: 'roomTitle', label: '모임 제목', width: 'w-[240px]' },
  { key: 'reason', label: '사유', width: 'w-[180px]' },
  { key: 'reportDate', label: '신고 날짜', width: 'w-[160px]' },
  { key: 'processed', label: '처리 여부', width: 'w-[80px]' },
] as const;
