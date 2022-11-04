import { Formik, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const FormikMUI = (): JSX.Element => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    initialValues,
    /* and other goodies */
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Frame title="<form> 制御: Formik / UI: MUI">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          {(errors.firstName || touched.firstName || errors.firstName) &&
            <Typography>
              {errors.firstName && touched.firstName && errors.firstName}
            </Typography>
          }
          <TextField
            type="text"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          {(errors.lastName || touched.lastName || errors.lastName) &&
            <Typography>
              {errors.lastName && touched.lastName && errors.lastName}
            </Typography>
          }
          <TextField
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {(errors.email || touched.email || errors.email) &&
            <Typography>
              {errors.email && touched.email && errors.email}
            </Typography>
          }
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Formik>
    </Frame>
  );
}

export default FormikMUI;