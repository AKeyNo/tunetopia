import { PropsWithChildren } from 'react';

export const AuthButton: React.FC<
  PropsWithChildren & { onClick?: () => Promise<void> }
> = ({ children, onClick }) => {
  return (
    <button
      className='inline-flex items-center justify-center h-4 p-4 duration-150 rounded-md bg-slate-700 text-slate-200 hover:text-white hover:bg-slate-600'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
