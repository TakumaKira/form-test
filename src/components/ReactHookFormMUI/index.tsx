import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
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
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <>
              <TextField label="First Name" {...field} />
              {errors.firstName &&
                <Typography>
                  {errors.firstName.message}
                </Typography>
              }
            </>
          }
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <>
              <TextField label="Last Name" {...field} />
              {errors.lastName &&
                <Typography>
                  {errors.lastName.message}
                </Typography>
              }
            </>
          }
        />
        <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) =>
            <FormControl>
              <InputLabel id="iceCreamTypeLabel">Ice Cream Type</InputLabel>
              <Select labelId="iceCreamTypeLabel" label="Ice Cream Type" {...field}>
                <MenuItem value="chocolate">Chocolate</MenuItem>
                <MenuItem value="strawberry">Strawberry</MenuItem>
                <MenuItem value="vanilla">Vanilla</MenuItem>
              </Select>
              {errors.iceCreamType &&
                <Typography>
                  {errors.iceCreamType.message}
                </Typography>
              }
            </FormControl>
          }
        />
        <Button type="submit">Submit</Button>
      </form>
    </Frame>
  );
}

export default ReactHookFormMUI;