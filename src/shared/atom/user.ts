import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import { User } from '@/shared/types';

export const KakaoAccessTokenAtom = atomWithStorage('kakaoAccessToken', {
  kakaoAccessToken: '',
});

type Token = {
  accessToken: string;
  refreshToken: string;
};

const initialUserState = {
  accessToken: '',
  refreshToken: '',
};

const sessionStorage = createJSONStorage(() => window.sessionStorage);

export const userTokenAtom = atomWithStorage<Token>(
  'userToken',
  initialUserState,
  sessionStorage as AsyncStorage<Token>,
);

export const userAtom = atom<User | null>(null);
