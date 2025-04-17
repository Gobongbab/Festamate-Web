export const fetchLoginStatus = () => {
  const stored = sessionStorage.getItem('userToken');
  if (stored) {
    const parsed = JSON.parse(stored);
    const hasToken: boolean =
      parsed.accessToken &&
      parsed.refreshToken &&
      parsed.accessToken.length > 0 &&
      parsed.refreshToken.length > 0;
    return hasToken;
  }
  return false;
};
