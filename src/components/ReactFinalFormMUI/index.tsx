import { Form, Field } from 'react-final-form';
import Select from '@mui/material/Select';

import Frame from '../common/Frame';
import cls from './index.module.scss';
import MenuItem from '@mui/material/MenuItem';

const ReactFinalFormMUI = (): JSX.Element => {
  const onSubmit = (args: any) => {
    console.log(args);
  }
  const validate = (args: any) => {
    console.log(args);
    return undefined;
  }

  return (
    <Frame title="<form> 制御: React Final Form / UI: MUI">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2>Simple Default Input</h2>
            <div>
              <label>First Name</label>
              <Field name="firstName" component="input" placeholder="First Name" />
            </div>

            <h2>An Arbitrary Reusable Input Component</h2>
            <div>
              <label>Interests</label>
              <Field name="interests" component={() => <Select>
                <MenuItem value="chocolate">Chocolate</MenuItem>
                <MenuItem value="strawberry">Strawberry</MenuItem>
                <MenuItem value="vanilla">Vanilla</MenuItem>
              </Select>} />
            </div>

            <h2>Render Function</h2>
            <Field
              name="bio"
              render={({ input, meta }) => (
                <div>
                  <label>Bio</label>
                  <textarea {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />

            <h2>Render Function as Children</h2>
            <Field name="phone">
              {({ input, meta }) => (
                <div>
                  <label>Phone</label>
                    <input type="text" {...input} placeholder="Phone" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Frame>
  );
}

export default ReactFinalFormMUI;