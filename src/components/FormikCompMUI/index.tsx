import { Formik, Form, Field, ErrorMessage, FormikProps, FieldInputProps } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const FieldComponent = ({ field, form, ...props }: { field: FieldInputProps<string>, form: FormikProps<any>, props: React.InputHTMLAttributes<HTMLInputElement> }) =>
  <TextField {...field} {...props} />

const FormikCompMUI = (): JSX.Element => {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  return (
    <Frame title="<form> 制御: Formik / UI: Formik + MUI">
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors }) => {
          console.log(errors);
          return (
            <Form>
              <Field type="text" name="firstName" component={FieldComponent} />
              <ErrorMessage name="firstName" component={Typography} />
              <Field type="text" name="lastName">
                {FieldComponent}
              </Field>
              <ErrorMessage name="lastName" component={Typography} />
              <Field type="email" name="email" component={FieldComponent} />
              <ErrorMessage name="email" component={Typography} />
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