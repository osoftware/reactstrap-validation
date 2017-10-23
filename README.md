# reactstrap-validation
HTML5 Validation Helpers for Reactstrap

## Usage

Basically, replace `FormGroup` from reactstrap with `ValidatingFormGroup`. This will cause the `Input` inside to have `valid` prop bound to HTML5 ValidationState.

Optional props:

* `trigger` - can be `blur` (default) or `change`
* `onStateChange` - callback that gets called when internal validation state change occurs. This state is passed in callback argument and it has properties:
    * `value` - fields current value
    * `ref` - HTML5 field reference
    * `valid` - can be `undefined` (initial value), `true` or `false`
    * `validationMessage`.
* `valid` - the initial validity that the field will have when internal validation state is `undefined`. Can be used to handle server-side validation feedback. Changing this prop resets internal validation state back to undefined.

## Example
```JSX
import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import { Form, FormFeedback, Input } from 'reactstrap';
import { ValidatingFormGroup } from 'reactstrap-validation';

export interface HelloProps {
  initialValid?: boolean;
}

export class Hello extends React.Component<HelloProps> {
  render() {
    const { initialValid } = this.props;
    return (
      <Form>
        <ValidatingFormGroup trigger="change" valid={initialValid} onStateChange={console.log}>
          <Input required type="email" />
          <FormFeedback>
            <iframe src="https://giphy.com/embed/3oz8xLd9DJq2l2VFtu" width="480" height="287"></iframe>
          </FormFeedback>
        </ValidatingFormGroup>
      </Form>
    );
  }
}
```
