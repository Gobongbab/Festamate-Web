export const DETAIL_OPTION = {
  headCount: [
    { id: 'people-2', value: 2, label: '2명 (1:1)' },
    { id: 'people-4', value: 4, label: '4명 (2:2)' },
    { id: 'people-6', value: 6, label: '6명 (3:3)' },
  ] as const,
  preferredGender: [
    { id: 'male', value: '남성', label: '남자' },
    { id: 'female', value: '여성', label: '여자' },
  ],
};
