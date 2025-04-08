import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'InitialKakaoAccessToken',
  storage: sessionStorage,
});

export const KakaoAccessTokenAtom = atom({
  key: 'KakaoAccessToken',
  default: { access_token: '' },
  effects_UNSTABLE: [persistAtom],
});
