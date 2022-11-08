import { Formik, Form, Field, ErrorMessage, FormikProps, FieldInputProps, FieldMetaProps } from 'formik';
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

const Input = (props: {field: FieldInputProps<string>, form: FormikProps<any>, inputProps: React.InputHTMLAttributes<HTMLInputElement>}) => {
  const {field, form, ...inputProps} = props
  return <TextField sx={{ width: 1 }} {...field} {...inputProps} />
}

/** ErrorMessageコンポーネントのcomponentプロパティの型がstring | React.ComponentType<{}>になってしまっているため、props: any（実際はprops: {children: string}）にしないと型チェックでエラーになる */
const ErrorMessageComponent = (props: any): JSX.Element => {
  return (
    <Typography variant="body2" sx={{color: 'red'}}>
      {props.children}
    </Typography>
  )
}

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
});

const FormikCompMUI = (): JSX.Element => {
  return (
    <Frame title="<form> 制御: Formik / UI: Formik + MUI">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          iceCreamType: '',
          gender: '',
          gilad: false,
          jason: false,
          antoine: false,
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setTimeout(() => setSubmitting(false), 1000)
        }}
      >
        {({ isSubmitting, handleReset }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="firstName" label="First Name" component={Input} />
                  <ErrorMessage name="firstName" component={ErrorMessageComponent} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="lastName">
                    {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<string>, meta: FieldMetaProps<string> }) =>
                      <TextField label="Last Name" sx={{ width: 1 }} {...field} />
                    }
                  </Field>
                  <ErrorMessage name="lastName" render={msg =>
                    <Typography variant="body2" sx={{color: 'red'}}>
                      {msg}
                    </Typography>
                  } />
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: 1 }}>
                    <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
                    <Field name="iceCreamType">
                      {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<string>, meta: FieldMetaProps<string> }) =>
                        <Select labelId="iceCreamTypeLabel" label="Ice Cream Type" {...field}>
                          <MenuItem value="chocolate">Chocolate</MenuItem>
                          <MenuItem value="strawberry">Strawberry</MenuItem>
                          <MenuItem value="vanilla">Vanilla</MenuItem>
                        </Select>
                      }
                    </Field>
                  </FormControl>
                  <ErrorMessage name="iceCreamType">
                    {msg =>
                      <Typography variant="body2" sx={{color: 'red'}}>
                        {msg}
                      </Typography>
                    }
                  </ErrorMessage>
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="genderLabel">Gender</FormLabel>
                    <Field name="gender">
                      {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<string>, meta: FieldMetaProps<string> }) =>
                        <RadioGroup
                          row
                          aria-labelledby="genderLabel"
                          {...field}
                        >
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="other" control={<Radio />} label="Other" />
                          <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                          />
                        </RadioGroup>
                      }
                    </Field>
                    <FormHelperText>Please select</FormHelperText>
                  </FormControl>
                  <ErrorMessage name="gender">
                    {msg =>
                      <Typography variant="body2" sx={{color: 'red'}}>
                        {msg}
                      </Typography>
                    }
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel component="legend">Assign responsibility</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Field name="gilad" type="checkbox">
                            {({ field, form, meta }: { field: FieldInputProps<boolean>, form: FormikProps<boolean>, meta: FieldMetaProps<boolean> }) =>
                              <Checkbox {...field} />
                            }
                          </Field>
                        }
                        label="Gilad Gray"
                      />
                      <FormControlLabel
                        control={
                          <Field name="jason" type="checkbox">
                            {({ field, form, meta }: { field: FieldInputProps<boolean>, form: FormikProps<boolean>, meta: FieldMetaProps<boolean> }) =>
                              <Checkbox {...field} />
                            }
                          </Field>
                        }
                        label="Jason Killian"
                      />
                      <FormControlLabel
                        control={
                          <Field name="antoine" type="checkbox">
                            {({ field, form, meta }: { field: FieldInputProps<boolean>, form: FormikProps<boolean>, meta: FieldMetaProps<boolean> }) =>
                              <Checkbox {...field} />
                            }
                          </Field>
                        }
                        label="Antoine Llorca"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                  <Button onClick={handleReset}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Frame>
  );
}

export default FormikCompMUI;