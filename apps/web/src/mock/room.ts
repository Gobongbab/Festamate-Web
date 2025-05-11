export const COVERED_ROOM_DATA = [
  {
    id: 1,
    preferredGender: 'FEMALE',
    preferredStudentIdMin: 'string',
    preferredStudentIdMax: 'string',
    meetingDateTime: '2025-04-20T18:30:00Z',
    status: 'MATCHING',
    title: '한강에서 피크닉할 사람!!',
    content:
      '날씨 좋을 때 한강에서 돗자리 깔고 놀 사람 구해요! 간단한 간식이랑 음료는 제가 준비할게요 :)',
    place: '여의도 한강공원',
    maxParticipants: 4,
    currentParticipants: 2,
    chatRoomId: 1,
    thumbnail: {
      name: 'picnic.jpg',
      url: 'https://example.com/images/picnic.jpg',
    },
  } as const,
  {
    id: 2,
    preferredGender: 'MALE',
    preferredStudentIdMin: 'string',
    preferredStudentIdMax: 'string',
    meetingDateTime: '2025-04-15T14:00:00Z',
    status: 'MATCHING',
    title: '보드게임 같이 하실 분 구함',
    content:
      '보드게임 좋아하시는 분들 환영이에요! 다양한 게임 준비되어 있어요. 초보자도 환영합니다.',
    place: '홍대 보드게임 카페',
    maxParticipants: 6,
    currentParticipants: 4,
    chatRoomId: 1,
    thumbnail: {
      name: 'boardgame.png',
      url: 'https://example.com/images/boardgame.png',
    },
  } as const,
  {
    id: 3,
    preferredGender: 'FEMALE',
    preferredStudentIdMin: 'string',
    preferredStudentIdMax: 'string',
    meetingDateTime: '2025-04-18T10:00:00Z',
    status: 'MATCHING',
    title: '아침 등산 같이 가실 분~',
    content:
      '이른 아침 등산으로 상쾌한 하루 시작해요! 중간에 간단한 간식 타임도 있어요.',
    place: '북한산 둘레길',
    maxParticipants: 4,
    currentParticipants: 1,
    chatRoomId: 1,
    thumbnail: {
      name: 'hiking.jpg',
      url: 'https://example.com/images/hiking.jpg',
    },
  } as const,
];
