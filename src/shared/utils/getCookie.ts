export const getCookie = async () => {
  /*name: string* */
  // const value = `; ${document.cookie}`;
  // const parts = value.split(`; ${name}=`);
  // if (parts.length === 2) return parts[parts.length - 1].split(';').shift();
  const token: { accessToken: string } = (await fetch(
    'http://festamate.shop/test/create',
    {
      method: 'POST',
    },
  )) as unknown as { accessToken: string };
  console.log(token);
  return token.accessToken;
};
