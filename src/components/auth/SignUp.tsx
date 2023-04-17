import { CircleNotch, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  SignUpErrors,
  SignUpFields,
  TouchedSignUpFields,
} from '../../../lib/types/auth';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { EMAIL_REGEX } from '../../../lib/regex/auth';

export const SignUp: React.FC = () => {
  const supabase = useSupabaseClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [signUpFields, setSignUpFields] = useState<SignUpFields>({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
  } as SignUpFields);

  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>(
    {} as SignUpErrors
  );

  const { emailError, usernameError, passwordError, confirmPasswordError } =
    signUpErrors;

  const [touchedSignUpFields, setTouchedSignUpFields] =
    useState<TouchedSignUpFields>({
      email: false,
      username: false,
      password: false,
      confirmPassword: false,
    } as TouchedSignUpFields);

  const onEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouchedSignUpFields({ ...touchedSignUpFields, email: true });
    setSignUpFields({ ...signUpFields, email: e.target.value });

    let emailError = null as SignUpErrors['emailError'];

    if (e.target.value === null || e.target.value === '') {
      emailError = 'Email is required';
    } else if (!EMAIL_REGEX.test(e.target.value)) {
      emailError = 'Email is invalid';
    }

    setSignUpErrors({
      ...signUpErrors,
      emailError,
      serverError: null,
    });
  };

  const onUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouchedSignUpFields({ ...touchedSignUpFields, username: true });
    setSignUpFields({ ...signUpFields, username: e.target.value });

    let usernameError = null as SignUpErrors['usernameError'];

    if (e.target.value === null || e.target.value === '') {
      usernameError = 'Username is required';
    }

    setSignUpErrors({
      ...signUpErrors,
      usernameError,
      serverError: null,
    });
  };

  const onPasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouchedSignUpFields({ ...touchedSignUpFields, password: true });
    setSignUpFields({ ...signUpFields, password: e.target.value });

    let passwordError = null as SignUpErrors['passwordError'];
    let confirmPasswordError = null as SignUpErrors['confirmPasswordError'];

    if (e.target.value === null || e.target.value === '') {
      passwordError = 'Password is required';
    } else if (e.target.value.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }

    if (
      signUpFields.confirmPassword === null ||
      signUpFields.confirmPassword === ''
    ) {
      confirmPasswordError = 'Confirm password is required';
    } else if (e.target.value !== signUpFields.confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
    }

    setSignUpErrors({
      ...signUpErrors,
      passwordError,
      confirmPasswordError,
      serverError: null,
    });
  };

  const onConfirmPasswordChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTouchedSignUpFields({ ...touchedSignUpFields, confirmPassword: true });
    setSignUpFields({ ...signUpFields, confirmPassword: e.target.value });

    let confirmPasswordError = null as SignUpErrors['confirmPasswordError'];

    if (e.target.value === null || e.target.value === '') {
      confirmPasswordError = 'Confirm password is required';
    } else if (e.target.value !== signUpFields.password) {
      confirmPasswordError = 'Passwords do not match';
    }

    setSignUpErrors({
      ...signUpErrors,
      confirmPasswordError,
      serverError: null,
    });
  };

  const updateBorder = ({
    field,
  }: {
    field: 'email' | 'username' | 'password' | 'confirmPassword';
  }) => {
    if (!touchedSignUpFields[field]) {
      return 'border-gray-300 focus:border-red-500';
    }

    if (signUpErrors[`${field}Error`]) {
      return 'border-red-500 focus:border-red-500';
    }

    return 'border-green-500 focus:border-green-500';
  };

  const signUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouchedSignUpFields({
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    });

    if (emailError || usernameError || passwordError || confirmPasswordError) {
      return;
    }

    const { email, username, password } = signUpFields;

    if (!email || !username || !password) {
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password!,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        setSignUpErrors({
          ...signUpErrors,
          serverError: error.message,
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
        <button
          className='inline-flex items-center justify-center h-4 p-4 duration-150 rounded-md bg-slate-700 text-slate-200 hover:text-white hover:bg-slate-600'
          data-cy='sign-up-button'
        >
          Sign Up
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
        <Dialog.Content className='fixed w-9/12 max-w-lg p-8 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-md shadow-lg top-1/2 left-1/2'>
          <Dialog.Title className='font-semibold select-none'>
            Sign Up
          </Dialog.Title>
          <Dialog.Description className='mb-4 text-slate-300'>
            Create an account to start managing your music.
          </Dialog.Description>

          <form onSubmit={signUpSubmit}>
            <fieldset className='flex flex-col mb-4 gap-x-4'>
              <div className='flex items-center gap-x-4'>
                <label className='w-32 text-right'>Email</label>
                <input
                  className={
                    'inline-flex items-center flex-1 w-full bg-gray-800 border-2 px-1 border-opacity-50 rounded-sm focus:border-b-2 !outline-none duration-150' +
                    ' ' +
                    updateBorder({ field: 'email' })
                  }
                  value={signUpFields.email as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onEmailChange(e);
                  }}
                  type='email'
                  required
                  data-cy='sign-up-email-input'
                />
              </div>
              {emailError && (
                <div className='w-full text-red-400 text-end'>
                  <span data-cy='sign-up-email-error'>{emailError}</span>
                </div>
              )}
            </fieldset>
            <fieldset className='flex flex-col mb-4 gap-x-4'>
              <div className='flex items-center gap-x-4'>
                <label className='w-32 text-right'>Username</label>
                <input
                  className={
                    'inline-flex items-center flex-1 w-full bg-gray-800 border-2 px-1 border-opacity-50 rounded-sm focus:border-b-2 !outline-none duration-150' +
                    ' ' +
                    updateBorder({ field: 'username' })
                  }
                  value={signUpFields.username as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onUsernameChange(e);
                  }}
                  required
                  data-cy='sign-up-username-input'
                />
              </div>
              {usernameError && (
                <div className='w-full text-red-400 text-end'>
                  <span data-cy='sign-up-username-error'>{usernameError}</span>
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
                  value={signUpFields.password as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onPasswordChange(e);
                  }}
                  required
                  data-cy='sign-up-password-input'
                />
              </div>
              {passwordError && (
                <div className='w-full text-red-400 text-end'>
                  <span data-cy='sign-up-password-error'>{passwordError}</span>
                </div>
              )}
            </fieldset>
            <fieldset className='flex flex-col mb-4 gap-x-4'>
              <div className='flex items-center gap-x-4'>
                <label className='w-32 text-right'>Confirm Password</label>
                <input
                  className={
                    'inline-flex items-center flex-1 w-full bg-gray-800 border-2 px-1 border-opacity-50 rounded-sm focus:border-b-2 !outline-none duration-150' +
                    ' ' +
                    updateBorder({ field: 'confirmPassword' })
                  }
                  type='password'
                  value={signUpFields.confirmPassword as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onConfirmPasswordChange(e);
                  }}
                  required
                  data-cy='sign-up-confirm-password-input'
                />
              </div>
              {touchedSignUpFields.confirmPassword && confirmPasswordError && (
                <div className='w-full text-red-400 text-end'>
                  <span data-cy='sign-up-confirm-password-error'>
                    {confirmPasswordError}
                  </span>
                </div>
              )}
            </fieldset>
            <div className='flex items-center justify-end mt-4 space-x-2'>
              {/* <Dialog.Close asChild>
                <p className='text-center text-slate-300'>
                  I don't have an account
                </p>
              </Dialog.Close> */}
              <p className='text-red-400' data-cy='sign-up-server-error'>
                {signUpErrors.serverError}
              </p>
              {loading && (
                <CircleNotch
                  className='animate-spin animate-fade-in'
                  size={20}
                  data-cy='sign-up-loading'
                />
              )}
              <button
                className='inline-flex items-center justify-center h-4 p-4 bg-green-600 rounded-md w-28'
                data-cy='sign-up-submit-button'
              >
                Sign Up
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
