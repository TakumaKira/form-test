import { Form, Field, FieldRenderProps } from 'react-final-form';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const Input = (label: string) => (props: FieldRenderProps<any, HTMLElement, any>) => {
  const {input, meta} = props
  return (<>
    <TextField label={label} {...input} />
    {meta.touched && meta.error && <Typography>{meta.error}</Typography>}
  </>)
}
const FirstNameInput = Input('First Name')

const ReactFinalFormMUI = (): JSX.Element => {
  const onSubmit = (args: any) => {
    console.log(args);
  }

  return (
    <Frame title="<form> 制御: React Final Form / UI: MUI">
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: { firstName?: string } = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          return errors;
        }}
        render={({ handleSubmit }) =>
          <form onSubmit={handleSubmit}>
            <Field name="firstName" component={FirstNameInput} />
            <Field name="lastName" render={({ input, meta }) =>
              <>
                <TextField label="Last Name" {...input} />
                {meta.touched && meta.error && <Typography>{meta.error}</Typography>}
              </>
            } />
            <Field name="iceCreamType" validate={value => {
              if (!value) {
                return 'Required';
              }
            }}>
              {({ input, meta }) =>
                <>
                  <Select {...input}>
                    <MenuItem value="chocolate">Chocolate</MenuItem>
                    <MenuItem value="strawberry">Strawberry</MenuItem>
                    <MenuItem value="vanilla">Vanilla</MenuItem>
                  </Select>
                  {meta.touched && meta.error && <Typography>{meta.error}</Typography>}
                </>
              }
            </Field>
            <Button type="submit">Submit</Button>
          </form>
        }
      />
    </Frame>
  );
}

export default ReactFinalFormMUI;