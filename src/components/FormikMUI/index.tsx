import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
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

const FormikMUI = (): JSX.Element => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    /* and other goodies */
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      iceCreamType: '',
      gender: '',
      gilad: false,
      jason: false,
      antoine: false,
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
      gender: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      console.log(values)
      setTimeout(() => setSubmitting(false), 1000)
    },
  });

  return (
    <Frame title="<form> 制御: Formik / UI: MUI">
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
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="genderLabel">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="genderLabel"
                name="gender"
                value={values.gender}
                onChange={handleChange}
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
              <FormHelperText>Please select</FormHelperText>
            </FormControl>
            {(errors.gender || touched.gender || errors.gender) &&
              <Typography variant="body2" sx={{color: 'red'}}>
                {errors.gender && touched.gender && errors.gender}
              </Typography>
            }
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel component="legend">Assign responsibility</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox checked={values.gilad} onChange={handleChange} name="gilad" />
                  }
                  label="Gilad Gray"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={values.jason} onChange={handleChange} name="jason" />
                  }
                  label="Jason Killian"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={values.antoine} onChange={handleChange} name="antoine" />
                  }
                  label="Antoine Llorca"
                />
              </FormGroup>
              <FormHelperText>Please select</FormHelperText>
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
      </form>
    </Frame>
  );
}

export default FormikMUI;