export interface SignUpFields {
  email: string | null;
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface SignInFields {
  email: string | null;
  password: string | null;
}

export interface SignUpErrors {
  emailError:
    | 'Email is required'
    | 'Email is invalid'
    | 'Email is already in use'
    | null;
  usernameError: 'Username is required' | 'Username is already in use' | null;
  passwordError:
    | 'Password is required'
    | 'Password must be at least 6 characters'
    | null;
  confirmPasswordError:
    | 'Confirm password is required'
    | 'Passwords do not match'
    | null;
  serverError: string | null;
}

export interface SignInErrors {
  emailError: 'Email is required' | 'Email is invalid' | null;
  passwordError: 'Password is required' | 'Password is incorrect' | null;
  serverError: string | null;
}

export interface TouchedSignUpFields {
  email: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface TouchedSignInFields {
  email: boolean;
  password: boolean;
}
