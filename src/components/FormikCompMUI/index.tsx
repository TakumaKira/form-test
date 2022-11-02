import { Formik, Form, Field, ErrorMessage } from 'formik';

import Frame from '../common/Frame';
import cls from './index.module.scss';

const FormikCompMUI = (): JSX.Element => {
  return (
    <Frame title="<form> 制御: Formik / UI: Formik + MUI">
      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors: { email?: string, password?: string } = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    </Frame>
  );
}

export default FormikCompMUI;