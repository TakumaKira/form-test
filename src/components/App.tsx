import Typography from '@mui/material/Typography';

import FormikCompMUI from './FormikCompMUI';
import FormikMUI from './FormikMUI';
import ReactHookFormMUI from './ReactHookFormMUI';
import ReactFinalFormMUI from './ReactFinalFormMUI';
import DataGridMUI from './DataGridMUI';

import cls from './App.module.scss';

const App = (): JSX.Element => {
  return (
    <div className={cls.container}>
      <Typography variant="h5" component="h1">
        form + data-grid 実装テスト
      </Typography>

      <FormikCompMUI />
      <FormikMUI />
      <ReactHookFormMUI />
      <ReactFinalFormMUI />

      <DataGridMUI />
    </div>
  );
}

export default App;
