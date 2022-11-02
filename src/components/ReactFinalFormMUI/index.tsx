import { Form, Field } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const ReactFinalFormMUI = (): JSX.Element => {
  const onSubmit = (args: any) => {
    console.log(args);
  }

  return (
    <Frame title="<form> 制御: React Final Form / UI: MUI">
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: { bio?: string, phone?: string } = {};
          if (!values.bio) {
            errors.bio = 'Required';
          }
          if (!values.phone) {
            errors.phone = 'Required';
          }
          return errors;
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="subtitle1" component="h2">
              Simple Default Input
            </Typography>
            <Box>
              <Field
                name="firstName"
                component={({ input }) => <TextField label="First Name" {...input} />}
                placeholder="First Name"
              />
            </Box>

            <Typography variant="subtitle1" component="h2">
              An Arbitrary Reusable Input Component
            </Typography>
            <Box>
              <Field name="interests" label="Interests" component={() => <Select>
                <MenuItem value="chocolate">Chocolate</MenuItem>
                <MenuItem value="strawberry">Strawberry</MenuItem>
                <MenuItem value="vanilla">Vanilla</MenuItem>
              </Select>} />
            </Box>

            <Typography variant="subtitle1" component="h2">
              Render Function
            </Typography>
            <Field
              name="bio"
              render={({ input, meta }) => (
                <Box>
                  <TextField label="Bio" multiline {...input} />
                  {meta.touched && meta.error && <Typography>{meta.error}</Typography>}
                </Box>
              )}
            />

            <Typography variant="subtitle1" component="h2">
              Render Function as Children
            </Typography>
            <Field name="phone">
              {({ input, meta }) => (
                <Box>
                  <TextField label="Phone" type="text" {...input} placeholder="Phone" />
                  {meta.touched && meta.error && <Typography>{meta.error}</Typography>}
                </Box>
              )}
            </Field>

            <Button type="submit">Submit</Button>
          </form>
        )}
      />
    </Frame>
  );
}

export default ReactFinalFormMUI;