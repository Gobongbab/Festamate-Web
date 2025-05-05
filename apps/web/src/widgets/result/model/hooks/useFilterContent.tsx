import { BOTTOM_SHEET } from '@/shared/constants';
import type { BottomSheetItem, Gender, RoomStatus } from '@/shared/types';
import { FilterButton } from '@/widgets/result/ui';
import { useState } from 'react';

export default function useFilterContent(sheetKey: BottomSheetItem) {
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus | undefined>(
    undefined,
  );
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    undefined,
  );
  const [selectedParticipants, setSelectedParticipants] = useState<
    2 | 4 | 6 | undefined
  >(undefined);

  const filterContent = {
    [BOTTOM_SHEET.FILTER_STATUS]: {
      title: '매칭 상태',
      content: (
        <div className='flex gap-2'>
          <FilterButton
            label='매칭 중'
            isSelected={selectedStatus === 'MATCHING'}
            onClick={() =>
              setSelectedStatus(
                selectedStatus === 'MATCHING' ? undefined : 'MATCHING',
              )
            }
          />
          <FilterButton
            label='매칭 완료'
            isSelected={selectedStatus === 'MATCHED'}
            onClick={() =>
              setSelectedStatus(
                selectedStatus === 'MATCHED' ? undefined : 'MATCHED',
              )
            }
          />
          <FilterButton
            label='모임 종료'
            isSelected={selectedStatus === 'CLOSED'}
            onClick={() =>
              setSelectedStatus(
                selectedStatus === 'CLOSED' ? undefined : 'CLOSED',
              )
            }
          />
        </div>
      ),
    },
    [BOTTOM_SHEET.FILTER_GENDER]: {
      title: '성별',
      content: (
        <div className='flex gap-2'>
          <FilterButton
            label='남자'
            isSelected={selectedGender === 'MALE'}
            onClick={() =>
              setSelectedGender(selectedGender === 'MALE' ? undefined : 'MALE')
            }
          />
          <FilterButton
            label='여자'
            isSelected={selectedGender === 'FEMALE'}
            onClick={() =>
              setSelectedGender(
                selectedGender === 'FEMALE' ? undefined : 'FEMALE',
              )
            }
          />
        </div>
      ),
    },
    [BOTTOM_SHEET.FILTER_PARTICIPANTS]: {
      title: '참여 인원',
      content: (
        <div className='flex gap-2'>
          <FilterButton
            label='1:1'
            isSelected={selectedParticipants === 2}
            onClick={() =>
              setSelectedParticipants(
                selectedParticipants === 2 ? undefined : 2,
              )
            }
          />
          <FilterButton
            label='2:2'
            isSelected={selectedParticipants === 4}
            onClick={() =>
              setSelectedParticipants(
                selectedParticipants === 4 ? undefined : 4,
              )
            }
          />
          <FilterButton
            label='3:3'
            isSelected={selectedParticipants === 6}
            onClick={() =>
              setSelectedParticipants(
                selectedParticipants === 6 ? undefined : 6,
              )
            }
          />
        </div>
      ),
    },
  } as const;

  const content = filterContent[sheetKey as keyof typeof filterContent];

  return {
    content,
    selectedStatus,
    selectedGender,
    selectedParticipants,
  };
}
