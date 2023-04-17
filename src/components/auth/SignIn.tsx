import { CircleNotch, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  SignInErrors,
  SignInFields,
  TouchedSignInFields,
} from '../../../lib/types/auth';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthButton } from './AuthButton';
import { EMAIL_REGEX } from '../../../lib/regex/auth';

export const SignIn: React.FC = () => {
  const supabase = useSupabaseClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [signInFields, setSignInFields] = useState<SignInFields>({
    email: null,
    password: null,
  } as SignInFields);

  const [signInErrors, setSignInErrors] = useState<SignInErrors>(
    {} as SignInErrors
  );

  const { emailError, passwordError } = signInErrors;

  const [touchedSignInFields, setTouchedSignInFields] =
    useState<TouchedSignInFields>({
      email: false,
      password: false,
    } as TouchedSignInFields);

  const onEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouchedSignInFields({ ...touchedSignInFields, email: true });
    setSignInFields({ ...signInFields, email: e.target.value });

    let emailError = null as SignInErrors['emailError'];

    if (e.target.value === null || e.target.value === '') {
      emailError = 'Email is required';
    } else if (!EMAIL_REGEX.test(e.target.value)) {
      emailError = 'Email is invalid';
    }

    setSignInErrors({
      ...signInErrors,
      emailError,
      serverError: null,
    });
  };

  const onPasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouchedSignInFields({ ...touchedSignInFields, password: true });
    setSignInFields({ ...signInFields, password: e.target.value });

    let passwordError = null as SignInErrors['passwordError'];

    if (e.target.value === null || e.target.value === '') {
      passwordError = 'Password is required';
    }

    setSignInErrors({
      ...signInErrors,
      passwordError,
      serverError: null,
    });
  };

  const updateBorder = ({ field }: { field: 'email' | 'password' }) => {
    if (!touchedSignInFields[field]) {
      return 'border-gray-300 focus:border-red-500';
    }

    if (signInErrors[`${field}Error`]) {
      return 'border-red-500 focus:border-red-500';
    }

    return 'border-green-500 focus:border-green-500';
  };

  const signInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouchedSignInFields({
      email: true,
      password: true,
    });

    if (emailError || passwordError) {
      return;
    }

    const { email, password } = signInFields;

    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);
      setSignInErrors({} as SignInErrors);

      const { error } = await supabase.auth.signInWithPassword({
        email: signInFields.email!,
        password: signInFields.password!,
      });

      if (error) {
        setSignInFields({ email: '', password: '' });
        setSignInErrors({
          ...signInErrors,
          serverError: error.message,
        });
        setTouchedSignInFields({
          email: false,
          password: false,
        });

        throw error;
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <AuthButton data-cy='sign-in-button'>Sign In</AuthButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
        <Dialog.Content className='fixed w-9/12 max-w-lg p-8 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-md shadow-lg top-1/2 left-1/2'>
          <Dialog.Title className='font-semibold select-none'>
            Sign In
          </Dialog.Title>
          <Dialog.Description className='mb-4 text-slate-300'>
            Sign in to gain access to your playlists.
          </Dialog.Description>

          <form onSubmit={signInSubmit}>
            <fieldset className='flex flex-col mb-4 gap-x-4'>
              <div className='flex items-center gap-x-4'>
                <label className='w-32 text-right'>Email</label>
                <input
                  className={
                    'inline-flex items-center flex-1 w-full bg-gray-800 border-2 px-1 border-opacity-50 rounded-sm focus:border-b-2 !outline-none duration-150' +
                    ' ' +
                    updateBorder({ field: 'email' })
                  }
                  value={signInFields.email as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onEmailChange(e);
                  }}
                  type='email'
                  required
                  data-cy='sign-in-email-input'
                />
              </div>
              {emailError && (
                <div className='w-full text-red-400 text-end'>
                  <span data-cy='sign-in-email-error'>{emailError}</span>
                </div>
              )}
            </fieldset>
            <fieldset className='flex flex-col mb-4 gap-x-4'>
              <div className='flex items-center gap-x-4'>
                <label className='w-32 text-right'>Password</label>
                <input
                  className={
                    'inline-flex items-center flex-1 w-full bg-gray-800 border-2 px-1 border-opacity-50 rounded-sm focus:border-b-2 !outline-none duration-150' +
                    ' ' +
                    updateBorder({ field: 'password' })
                  }
                  type='password'
                  value={signInFields.password as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onPasswordChange(e);
                  }}
                  required
                  data-cy='sign-in-password-input'
                />
              </div>
              {passwordError && (
                <div className='w-full text-red-400 text-end'>
                  <span data-cy='sign-in-password-error'>{passwordError}</span>
                </div>
              )}
            </fieldset>
            <div className='flex items-center justify-end mt-4 space-x-2'>
              {/* <Dialog.Close asChild>
                <p className='text-center text-slate-300'>
                  I already have an account
                </p>
              </Dialog.Close> */}
              <p className='text-red-400' data-cy='sign-in-server-error'>
                {signInErrors.serverError}
              </p>
              {loading && (
                <CircleNotch
                  className='animate-spin animate-fade-in'
                  size={20}
                  data-cy='sign-in-loading'
                />
              )}
              <button
                className='inline-flex items-center justify-center h-4 p-4 bg-green-600 rounded-md w-28'
                data-cy='sign-in-submit-button'
              >
                Sign In
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className='absolute inline-flex items-center justify-center rounded-lg top-3 right-3'
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
