export interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}
