import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Frame from '../common/Frame';
import cls from './index.module.scss';

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: {label: string; value: string };
}

const ReactHookFormMUI = (): JSX.Element => {
  const { control, handleSubmit } = useForm<IFormInput>();

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
            <TextField label="First Name" {...field} />
          }
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <TextField label="Last Name" {...field} />
          }
        />
        <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) =>
            <Select label="Ice Cream Type" {...field}>
              <MenuItem value="chocolate">Chocolate</MenuItem>
              <MenuItem value="strawberry">Strawberry</MenuItem>
              <MenuItem value="vanilla">Vanilla</MenuItem>
            </Select>
          }
        />
        <Button type="submit">Submit</Button>
      </form>
    </Frame>
  );
}

export default ReactHookFormMUI;