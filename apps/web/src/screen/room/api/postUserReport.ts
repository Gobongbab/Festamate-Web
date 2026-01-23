import { useMutation } from '@tanstack/react-query';

import { getPath } from '@festamate/utils';

import { REQUEST, userPost } from '@/shared/api';
import { Reason } from '@/screen/room/types';

interface SubmitUserReportRequest {
  reason: Reason;
}

const postUserReport = async ({
  userId,
  reason,
}: {
  userId: number;
  reason: Reason;
}) => {
  await userPost<SubmitUserReportRequest>({
    request: getPath(REQUEST.USER_REPORT, `${userId}`),
    data: { reason: reason },
  });
};

export const usePostUserReport = () => {
  return useMutation({
    mutationFn: postUserReport,
  });
};
