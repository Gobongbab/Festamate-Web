export type Gender = 'MALE' | 'FEMALE';

type Status = 'ACTIVE' | 'BLOCKED';

export type User = {
  id: number;
  name: string;
  nickname: string;
  studentId: string;
  loginId: string;
  loginPassword: string;
  phoneNumber: string;
  gender: Gender;
  status: Status;
  department: string;
  profileImage: {
    name: string;
    url: string;
  };
};
