import { Form, Field, FieldRenderProps } from 'react-final-form';
import { setIn } from 'final-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const Input = (label: string) => (props: FieldRenderProps<any, HTMLElement, any>) => {
  const {input, meta} = props
  return (
    <>
      <TextField label={label} sx={{width: 1}} {...input} />
      {meta.touched && meta.error &&
        <Typography variant="body2" sx={{color: 'red'}}>
          {meta.error}
        </Typography>
      }
    </>
  )
}
const FirstNameInput = Input('First Name')

// https://gist.github.com/manzoorwanijk/5993a520f2ac7890c3b46f70f6818e0a
const validateFormValues = (schema: Yup.AnySchema) => async (values: any) => {
	try {
		await schema.validate(values, { abortEarly: false });
	} catch (err: any) {
		const errors = err.inner.reduce((formError: any, innerError: any) => {
			return setIn(formError, innerError.path, innerError.message);
		}, {});
		return errors;
	}
};
const schema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  iceCreamType: Yup.string()
    .required('Required'),
})
const validate = validateFormValues(schema)

const ReactFinalFormMUI = (): JSX.Element => {
  const onSubmit = (args: any) => {
    console.log(args);
  }

  return (
    <Frame title="<form> 制御: React Final Form / UI: MUI">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) =>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field name="firstName" component={FirstNameInput} />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="lastName"
                  render={({ input, meta }) =>
                    <>
                      <TextField label="Last Name" sx={{width: 1}} {...input} />
                      {meta.touched && meta.error &&
                        <Typography variant="body2" sx={{color: 'red'}}>
                          {meta.error}
                        </Typography>
                      }
                    </>
                  }
                  validate={value => {
                    if (value === 'test') {
                      return 'test is not allowed';
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Field name="iceCreamType">
                  {({ input, meta }) =>
                    <>
                      <FormControl sx={{ width: 1 }}>
                        <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
                        <Select labelId="iceCreamTypeLabel" label="Ice Cream Type" {...input}>
                          <MenuItem value="chocolate">Chocolate</MenuItem>
                          <MenuItem value="strawberry">Strawberry</MenuItem>
                          <MenuItem value="vanilla">Vanilla</MenuItem>
                        </Select>
                      </FormControl>
                      {meta.touched && meta.error &&
                        <Typography variant="body2" sx={{color: 'red'}}>
                          {meta.error}
                        </Typography>
                      }
                    </>
                  }
                </Field>
              </Grid>
              <Grid item xs={6} />
              <Grid item>
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </form>
        }
      />
    </Frame>
  );
}

export default ReactFinalFormMUI;