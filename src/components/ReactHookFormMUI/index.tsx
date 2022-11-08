import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: string;
  gender: string;
  gilad: boolean;
  jason: boolean;
  antoine: boolean;
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

const ReactHookFormMUI = (): JSX.Element => {

  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<IFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      iceCreamType: '',
      gender: '',
      gilad: false,
      jason: false,
      antoine: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(data)
        resolve()
      }, 1000)
    })
  };

  return (
    <Frame title="<form> 制御: React Hook Form / UI: MUI">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) =>
                <>
                  <TextField label="First Name" sx={{ width: 1 }} {...field} />
                  {errors.firstName &&
                    <Typography variant="body2" sx={{color: 'red'}}>
                      {errors.firstName.message}
                    </Typography>
                  }
                </>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) =>
                <>
                  <TextField label="Last Name" sx={{ width: 1 }} {...field} />
                  {errors.lastName &&
                    <Typography variant="body2" sx={{color: 'red'}}>
                      {errors.lastName.message}
                    </Typography>
                  }
                </>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: 1 }}>
              <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
              <Controller
                name="iceCreamType"
                control={control}
                render={({ field }) =>
                  <Select labelId="iceCreamTypeLabel" label="Ice Cream Type" {...field}>
                    <MenuItem value="chocolate">Chocolate</MenuItem>
                    <MenuItem value="strawberry">Strawberry</MenuItem>
                    <MenuItem value="vanilla">Vanilla</MenuItem>
                  </Select>
                }
              />
              {errors.iceCreamType &&
                <Typography variant="body2" sx={{color: 'red'}}>
                  {errors.iceCreamType.message}
                </Typography>
              }
            </FormControl>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="genderLabel">Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) =>
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
              />
              <FormHelperText>Please select</FormHelperText>
            </FormControl>
            {errors.gender &&
              <Typography variant="body2" sx={{color: 'red'}}>
                {errors.gender.message}
              </Typography>
            }
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel component="legend">Assign responsibility</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Controller
                      name="gilad"
                      control={control}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
                  }
                  label="Gilad Gray"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="jason"
                      control={control}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
                  }
                  label="Jason Killian"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="antoine"
                      control={control}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
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
            <Button onClick={() => reset()}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Frame>
  );
}

export default ReactHookFormMUI;