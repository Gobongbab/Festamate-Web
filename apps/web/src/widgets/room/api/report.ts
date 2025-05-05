import { useMutation } from '@tanstack/react-query';

import { getPath } from '@festamate/utils';

import { REQUEST, userPost } from '@/shared/api';
import { Reason } from '../types';

interface SubmitRoomReportRequest {
  reason: Reason;
}

const submitRoomReport = async ({
  roomId,
  reason,
}: {
  roomId: number;
  reason: Reason;
}) => {
  await userPost<SubmitRoomReportRequest>({
    request: getPath(REQUEST.ROOM_REPORT, `${roomId}`),
    data: { reason: reason },
  });
};

export const useSubmitRoomReport = () => {
  return useMutation({
    mutationFn: submitRoomReport,
  });
};
