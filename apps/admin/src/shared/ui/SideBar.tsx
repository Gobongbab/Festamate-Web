import React from 'react';

export default function SideBar() {
  return (
    <div className='box-shadow-dock border-border flex h-screen w-56 flex-col gap-20 border-r-[0.5px] px-6 py-12'>
      <p className='agbalumo-regular logo text-center'>Festamate!</p>
      <div className='flex flex-col items-center justify-center gap-4 text-lg font-medium'>
        <SideBarButton name='userList' label='회원 조회' />
        <SideBarButton name='userList' label='신고 조회' />
        <SideBarButton name='userList' label='모임 조회' />
      </div>
    </div>
  );
}

const SideBarButton = ({
  name,
  label,
}: {
  name: string;
  to?: string;
  label: string;
}) => {
  return (
    <button
      name={name}
      className='hover:text-point active:text-point border-point/60 w-fit cursor-pointer p-2 py-3 transition duration-150 hover:border-b-2 focus:outline-none active:border-b-2'
    >
      {label}
    </button>
  );
};
