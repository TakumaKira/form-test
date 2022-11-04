import { Formik, useFormik } from 'formik';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
      iceCreamType: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      iceCreamType: Yup.string()
        .required('Required'),
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
            label="First Name"
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
            label="Last Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          {(errors.lastName || touched.lastName || errors.lastName) &&
            <Typography>
              {errors.lastName && touched.lastName && errors.lastName}
            </Typography>
          }
          <Select
            name="iceCreamType"
            label="Ice Cream Type"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.iceCreamType}
          >
            <MenuItem value="chocolate">Chocolate</MenuItem>
            <MenuItem value="strawberry">Strawberry</MenuItem>
            <MenuItem value="vanilla">Vanilla</MenuItem>
          </Select>
          {(errors.iceCreamType || touched.iceCreamType || errors.iceCreamType) &&
            <Typography>
              {errors.iceCreamType && touched.iceCreamType && errors.iceCreamType}
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