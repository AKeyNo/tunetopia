import { PropsWithChildren, forwardRef } from 'react';

const AuthButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<{ onClick?: () => Promise<void>; 'data-cy'?: string }>
>(function AuthButton({ children, onClick, 'data-cy': dataCy }, ref) {
  return (
    <button
      ref={ref}
      className='inline-flex items-center justify-center h-4 p-4 duration-150 rounded-md bg-slate-700 text-slate-200 hover:text-white hover:bg-slate-600'
      onClick={onClick}
      data-cy={dataCy}
    >
      {children}
    </button>
  );
});

AuthButton.displayName = 'AuthButton';

export default AuthButton;
