import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../constants';
import { cn } from '@festamate/utils';

export default function SideBar() {
  const handleLogoutClick = () => {
    sessionStorage.removeItem('userToken');
    window.location.reload();
  };

  return (
    <div className='box-shadow-dock border-border flex h-screen w-56 flex-col justify-between border-r-[0.5px] px-6 py-12'>
      <div className='flex flex-col gap-12'>
        <p className='agbalumo-regular logo text-center'>Festamate!</p>
        <div className='flex flex-col items-center justify-center gap-6 text-lg font-medium'>
          <SideBarButton to={PATH.USER} label='회원 조회' />
          <SideBarButton to={PATH.REPORT} label='신고 조회' />
          <SideBarButton to={PATH.ROOM} label='모임 조회' />
        </div>
      </div>

      <button
        name='logout'
        className='cursor-pointer focus:outline-none'
        onClick={handleLogoutClick}
      >
        로그아웃
      </button>
    </div>
  );
}

const SideBarButton = ({ label, to }: { to: string; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'hover:text-point border-point/60 w-fit cursor-pointer text-xl transition duration-150 focus:outline-none',
          isActive && 'text-point',
        )
      }
    >
      {label}
    </NavLink>
  );
};
