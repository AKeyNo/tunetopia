import { PropsWithChildren } from 'react';

export const Button: React.FC<
  PropsWithChildren<{
    className?: string;
    'data-cy'?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
  }>
> = ({ children, className, 'data-cy': dataCy, onClick, type }) => {
  return (
    <button
      className={`inline-flex items-center justify-center h-4 p-4 duration-150 rounded-md bg-slate-700 text-slate-200 hover:text-white hover:bg-slate-600 ${className}`}
      data-cy={dataCy}
      onClick={onClick}
      type={type ?? 'button'}
    >
      {children}
    </button>
  );
};
