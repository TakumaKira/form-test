import Typography from '@mui/material/Typography';

import Formik from './Formik';
import FormikMUI from './FormikMUI';
import ReactHookFormMUI from './ReactHookFormMUI';
import ReactFinalFormMUI from './ReactFinalFormMUI';
import DataGrid from './DataGrid';

import cls from './App.module.scss';

const App = (): JSX.Element => {
  return (
    <div className={cls.container}>
      <Typography variant="h5" component="h1">
        form + data-grid 実装テスト
      </Typography>

      <Formik />
      <FormikMUI />
      <ReactHookFormMUI />
      <ReactFinalFormMUI />

      <DataGrid />
    </div>
  );
}

export default App;
