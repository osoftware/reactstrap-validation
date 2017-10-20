import { omit } from 'lodash/fp';
import * as React from 'react';
import { ReactChild, ReactElement } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

import { IState, IValidatingFormGroupProps, Trigger } from './Types';
import { validate } from './Validation';

export class ValidatingFormGroup extends React.Component<IValidatingFormGroupProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
    this.enhance = this.enhance.bind(this);
    this.reference = this.reference.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentWillReceiveProps(nextProps: IValidatingFormGroupProps) {
    if (nextProps.valid !== this.props.valid) {
      this.setState({ valid: undefined });
      if (typeof this.props.onStateChange === 'function') {
        this.props.onStateChange({ ...this.state, valid: undefined });
      }
    }
  }

  private enhance(element: ReactElement<any>, index) {
    const { trigger } = this.props;
    switch (element.type) {
      case Input:
        return React.cloneElement(element, {
          innerRef: this.reference,
          valid: this.isValid(),
          onChange: this.handle(element.props.onChange, 'change'),
          onBlur: this.handle(element.props.onBlur, 'blur'),
          key: index
        });
      case Label:
        return React.cloneElement(element, {
          children: element.props.children.map(this.enhance),
        });
      default:
        return element;
    }
  }

  private reference(ref) {
    return ref && this.state.ref !== ref && this.setState({ ref });
  }

  private isValid() {
    return this.state.valid === undefined ? this.props.valid : this.state.valid;
  }

  private handle(innerHandle, trigger: Trigger) {
    return e => {
      if (typeof innerHandle === 'function') innerHandle(e);
      if ((this.props.trigger || 'blur') === trigger) {
        const newState = validate(this.state);
        this.setState(newState);
        if (typeof this.props.onStateChange === 'function') {
          this.props.onStateChange(newState);
        }
      }
    };
  }

  render() {
    const children = this.props.children as Array<ReactElement<any>>;
    const props = omit(['trigger', 'state', 'onStateChange'], this.props);
    React
    return <FormGroup {...props}>{children.map(this.enhance)}</FormGroup>;
  }
}
