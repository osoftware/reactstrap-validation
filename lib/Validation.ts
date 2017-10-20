import { IState } from './Types';

export function validate(state: IState): IState {
  const valid = state.ref && state.ref.validity.valid;
  const validationMessage = state.ref && !valid && state.ref.validationMessage;
  return { ...state, valid, validationMessage };
}

export function forceValidate(state: IState): IState {
  state.ref.blur();
  return validate(state);
}
