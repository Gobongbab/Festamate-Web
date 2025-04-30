export type User = {
  id: number;
  name: string;
  nickname: string;
  studentId: string;
  loginId: string;
  loginPassword: string;
  phoneNumber: string;
  gender: Gender;
  department: string;
  profileImage: {
    name: string;
    url: string;
  };
};

export type Gender = 'MALE' | 'FEMALE';
