import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

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
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) => <Select {...field} >
            <MenuItem value="chocolate">Chocolate</MenuItem>
            <MenuItem value="strawberry">Strawberry</MenuItem>
            <MenuItem value="vanilla">Vanilla</MenuItem>
          </Select>}
        />
        <input type="submit" />
      </form>
    </Frame>
  );
}

export default ReactHookFormMUI;