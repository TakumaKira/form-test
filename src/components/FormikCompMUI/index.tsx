import { Formik, Form, Field, ErrorMessage, FormikProps, FieldInputProps, FieldMetaProps } from 'formik';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const Input = (props: {field: FieldInputProps<string>, form: FormikProps<any>, inputProps: React.InputHTMLAttributes<HTMLInputElement>}) => {
  const {field, form, ...inputProps} = props
  return <TextField {...field} {...inputProps} />
}

const FormikCompMUI = (): JSX.Element => {
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

  return (
    <Frame title="<form> 制御: Formik / UI: Formik + MUI">
      <Formik
        initialValues={{ firstName: '', lastName: '', iceCreamType: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Field name="firstName" label="First Name" component={Input} />
              <ErrorMessage name="firstName" component={Typography} />
              <Field name="lastName">
                {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<any>, meta: FieldMetaProps<string> }) =>
                  <TextField label="Last Name" {...field} />
                }
              </Field>
              <ErrorMessage name="lastName" component={Typography} />
              <Field name="iceCreamType">
                {({ field, form, meta }: { field: FieldInputProps<string>, form: FormikProps<any>, meta: FieldMetaProps<string> }) =>
                  <Select label="Ice Cream Type" {...field}>
                    <MenuItem value="chocolate">Chocolate</MenuItem>
                    <MenuItem value="strawberry">Strawberry</MenuItem>
                    <MenuItem value="vanilla">Vanilla</MenuItem>
                  </Select>
                }
              </Field>
              <ErrorMessage name="iceCreamType" component={Typography} />
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Frame>
  );
}

export default FormikCompMUI;