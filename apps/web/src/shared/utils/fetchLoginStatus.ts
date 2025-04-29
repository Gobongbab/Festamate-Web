export const fetchLoginStatus = () => {
  const stored = sessionStorage.getItem('userToken');
  if (stored) {
    const parsed = JSON.parse(stored);
    const hasToken: boolean =
      parsed.accessToken && parsed.accessToken.length > 0;
    return hasToken;
  }
  return false;
};
