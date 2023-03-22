import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const handleLogin = async (values: IProps) => {
    try {
      const { data } = await axios.post('/api/login', { ...values });
      if (!data.message) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl mb-6">Welcome back!</h1>
      <h2 className="text-lg">Login to The Family Office to continue.</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Please enter a valid email address')
            .required('Please enter email address'),
          password: Yup.string().required('Please enter your password')
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-full px-6 md:w-1/4 md:px-0">
            <label className="flex flex-col mt-6">
              Email/Username
              <Field
                type="email"
                name="email"
                className="text-black"
                placeholder="Email/Username"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400"
              />
            </label>
            <label className="flex flex-col mt-6">
              Password
              <Field
                type="password"
                name="password"
                className="text-black"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400"
              />
            </label>
            <a className="mt-6">Forgot Password?</a>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-500 text-gray-800 mt-6"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
