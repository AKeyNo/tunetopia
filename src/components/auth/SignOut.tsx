import { useSupabaseClient } from '@supabase/auth-helpers-react';
import AuthButton from './AuthButton';

export const SignOut: React.FC = () => {
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthButton onClick={() => handleSignOut()} data-cy='sign-out-button'>
      Sign Out
    </AuthButton>
  );
};
