import { Formik, useFormik } from 'formik';
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
          console.log(values)
          setSubmitting(false);
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                sx={{ width: 1 }}
              />
              {(errors.firstName || touched.firstName || errors.firstName) &&
                <Typography variant="body2" sx={{color: 'red'}}>
                  {errors.firstName && touched.firstName && errors.firstName}
                </Typography>
              }
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                sx={{ width: 1 }}
              />
              {(errors.lastName || touched.lastName || errors.lastName) &&
                <Typography variant="body2" sx={{color: 'red'}}>
                  {errors.lastName && touched.lastName && errors.lastName}
                </Typography>
              }
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: 1 }}>
                <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
                <Select
                  name="iceCreamType"
                  labelId="iceCreamTypeLabel"
                  label="Ice Cream Type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.iceCreamType}
                >
                  <MenuItem value="chocolate">Chocolate</MenuItem>
                  <MenuItem value="strawberry">Strawberry</MenuItem>
                  <MenuItem value="vanilla">Vanilla</MenuItem>
                </Select>
              </FormControl>
              {(errors.iceCreamType || touched.iceCreamType || errors.iceCreamType) &&
                <Typography variant="body2" sx={{color: 'red'}}>
                  {errors.iceCreamType && touched.iceCreamType && errors.iceCreamType}
                </Typography>
              }
            </Grid>
            <Grid item xs={6} />
            <Grid item>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Formik>
    </Frame>
  );
}

export default FormikMUI;