export interface IState {
  value?: any;
  ref?: HTMLInputElement | HTMLSelectElement;
  valid?: boolean;
  validationMessage?: string;
}

export type Trigger = 'blur' | 'change';

export interface IValidatingFormGroupProps {
  valid?: boolean;
  trigger?: Trigger;
  onStateChange?: (state: IState) => any;
}
