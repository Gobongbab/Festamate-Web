export const Appbar = {
  renderLeft: () => (
    <span className='agbalumo-regular ml-2 text-lg font-bold'>Festamate!</span>
  ),
  renderRight: () => (
    <div
      className='mr-2 size-10 rounded-[50%] bg-cover bg-center'
      style={{
        backgroundImage:
          'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
      }}
    />
  ),
  height: '60px',
  backgroundColor: '#f4f4f4',
}

export const SearchAppbar = {
  renderLeft: () => (
    <span className='agbalumo-regular ml-2 text-lg font-bold' />
  ),
  renderRight: () => (
    <div
      className='mr-2 size-10 rounded-[50%] bg-cover bg-center'
      style={{
        backgroundImage:
          'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
      }}
    />
  ),
  height: '60px',
  backgroundColor: '#f4f4f4',
}
