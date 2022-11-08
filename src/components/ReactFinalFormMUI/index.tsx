import { Form, Field, FieldRenderProps, useForm, FormRenderProps } from 'react-final-form';
import { setIn } from 'final-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

import Frame from '../common/Frame';

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
  gender: Yup.string()
    .required('Required'),
})
const validate = validateFormValues(schema)

const ReactFinalFormMUI = (): JSX.Element => {
  const onSubmit = (args: any) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(args);
        resolve()
      }, 1000)
    })
  }

  return (
    <Frame title="<form> 制御: React Final Form / UI: MUI">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          firstName: '',
          lastName: '',
          iceCreamType: '',
          gender: '',
          gilad: false,
          jason: false,
          antoine: false,
        }}
      >
        {props => <FormInside {...props} />}
      </Form>
    </Frame>
  );
}

export default ReactFinalFormMUI;

const FormInside = (props: FormRenderProps<any, Partial<any>>) => {
  const {handleSubmit, submitting} = props
  const {restart} = useForm()

  return (
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
        <Grid item xs={12}>
          <FormControl>
            <Field name="gender">
              {({meta}) =>
                <>
                  <FormLabel id="genderLabel">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="genderLabel"
                  >
                    <FormControlLabel value="female" control={
                      <Field name="gender" value="female" type="radio">
                        {({input}) => <Radio {...input} />}
                      </Field>
                    } label="Female" />
                    <FormControlLabel value="male" control={
                      <Field name="gender" value="male" type="radio">
                        {({input}) => <Radio {...input} />}
                      </Field>
                    } label="Male" />
                    <FormControlLabel value="other" control={
                      <Field name="gender" value="other" type="radio">
                        {({input}) => <Radio {...input} />}
                      </Field>
                    } label="Other" />
                    <FormControlLabel
                      value="disabled"
                      disabled
                      control={
                        <Field name="gender" value="disabled" type="radio">
                          {({input}) => <Radio {...input} />}
                        </Field>
                      }
                      label="other"
                    />
                  </RadioGroup>
                  <FormHelperText>Please select</FormHelperText>
                  {meta.touched && meta.error &&
                    <Typography variant="body2" sx={{color: 'red'}}>
                      {meta.error}
                    </Typography>
                  }
                </>
              }
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Field name="gilad" type="checkbox">
                    {({ input, meta }) =>
                      <Checkbox {...input} />
                    }
                  </Field>
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Field name="jason" type="checkbox">
                    {({ input, meta }) =>
                      <Checkbox {...input} />
                    }
                  </Field>
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Field name="antoine" type="checkbox">
                    {({ input, meta }) =>
                      <Checkbox {...input} />
                    }
                  </Field>
                }
                label="Antoine Llorca"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
          <Button onClick={() => restart()}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
