import { Formik, Form, Field, ErrorMessage, FormikProps, FieldInputProps, FieldMetaProps } from 'formik';
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
});

const FormikCompMUI = (): JSX.Element => {
  return (
    <Frame title="<form> 制御: Formik / UI: Formik + MUI">
      <Formik
        initialValues={{ firstName: '', lastName: '', iceCreamType: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="firstName" label="First Name" component={Input} />
                  <ErrorMessage name="firstName" component={ErrorMessageComponent} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="lastName">
                    {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<any>, meta: FieldMetaProps<string> }) =>
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
                  <Field name="iceCreamType">
                    {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<any>, meta: FieldMetaProps<string> }) =>
                      <FormControl sx={{ width: 1 }}>
                        <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
                        <Select labelId="iceCreamTypeLabel" label="Ice Cream Type" {...field}>
                          <MenuItem value="chocolate">Chocolate</MenuItem>
                          <MenuItem value="strawberry">Strawberry</MenuItem>
                          <MenuItem value="vanilla">Vanilla</MenuItem>
                        </Select>
                      </FormControl>
                    }
                  </Field>
                  <ErrorMessage name="iceCreamType">
                    {msg =>
                      <Typography variant="body2" sx={{color: 'red'}}>
                        {msg}
                      </Typography>
                    }
                  </ErrorMessage>
                </Grid>
                <Grid item xs={6} />
                <Grid item>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
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