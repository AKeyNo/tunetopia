import { useUser } from '@supabase/auth-helpers-react';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { SignOut } from '../auth/SignOut';

export const Header: React.FC<{
  className?: string;
  scrollPosition: number;
}> = ({ className, scrollPosition }) => {
  const user = useUser();

  return (
    <header
      className={
        'flex justify-end p-4 space-x-2 items-center sticky h-16 w-full z-50 top-0 duration-300' +
        `${' '}${scrollPosition > 50 && 'bg-black bg-opacity-90'}` +
        `${' '}${className}`
      }
    >
      {!user ? (
        <>
          <SignIn />
          <SignUp />
        </>
      ) : (
        <div className='flex items-center space-x-2'>
          <p data-cy={`user-username-${user.user_metadata.username}`}>
            {user.user_metadata.username}
          </p>
          <SignOut />
        </div>
      )}
    </header>
  );
};
