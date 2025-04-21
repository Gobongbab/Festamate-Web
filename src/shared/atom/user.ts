import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

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

export const userAtom = atomWithStorage<Token>(
  'userToken',
  initialUserState,
  sessionStorage as AsyncStorage<Token>,
);
