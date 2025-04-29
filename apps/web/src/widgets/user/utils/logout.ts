export const logout = () => {
  sessionStorage.removeItem('userToken');
  window.location.reload();
};
