import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: {label: string; value: string };
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

const ReactHookFormMUI = (): JSX.Element => {

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({resolver: yupResolver(schema)});

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
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
            <Controller
              name="iceCreamType"
              control={control}
              render={({ field }) =>
                <FormControl sx={{ width: 1 }}>
                  <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
                  <Select labelId="iceCreamTypeLabel" label="Ice Cream Type" {...field}>
                    <MenuItem value="chocolate">Chocolate</MenuItem>
                    <MenuItem value="strawberry">Strawberry</MenuItem>
                    <MenuItem value="vanilla">Vanilla</MenuItem>
                  </Select>
                  {errors.iceCreamType &&
                    <Typography variant="body2" sx={{color: 'red'}}>
                      {errors.iceCreamType.message}
                    </Typography>
                  }
                </FormControl>
              }
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Frame>
  );
}

export default ReactHookFormMUI;