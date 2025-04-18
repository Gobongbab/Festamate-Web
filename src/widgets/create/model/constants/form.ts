export const DETAIL_OPTION = {
  headCount: [
    { id: 'people-2', value: 2, label: '2명 (1:1)' },
    { id: 'people-4', value: 4, label: '4명 (2:2)' },
    { id: 'people-6', value: 6, label: '6명 (3:3)' },
  ] as const,
  preferredGender: [
    { id: 'male', value: 'MALE', label: '남자' } as const,
    { id: 'female', value: 'FEMALE', label: '여자' } as const,
  ],
};
