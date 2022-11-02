import { Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const FormikMUI = (): JSX.Element => {
  return (
    <Frame title="<form> 制御: Formik / UI: MUI">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: { email?: string, password?: string } = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
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
            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {(errors.password || touched.password || errors.password) &&
              <Typography>
                {errors.password && touched.password && errors.password}
              </Typography>
            }
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Frame>
  );
}

export default FormikMUI;