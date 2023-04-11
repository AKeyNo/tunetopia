import { PropsWithChildren } from 'react';

export const SidebarButton: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <button className='block w-full p-2 font-semibold duration-200 rounded-md text-start hover:bg-slate-800 text-slate-300 hover:text-slate-50'>
      {children}
    </button>
  );
};
