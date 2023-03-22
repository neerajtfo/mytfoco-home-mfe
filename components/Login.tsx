import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Container,
  Heading,
  Text,
  Link
} from '@chakra-ui/react';

interface IProps {
  email: string;
  password: string;
}
interface IThemeInput {
  placeholder?: string;
}

const ThemeInput = (props: IThemeInput) => (
  <Input
    backgroundColor="gray.800"
    borderRadius="sm"
    borderColor="whiteAlpha.300"
    _hover={{ borderColor: 'whiteAlpha.400' }}
    {...props}
  />
);

export default function App() {
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
    <Container
      display="flex"
      flexDirection="column"
      maxW="sm"
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      <Heading fontSize={['2xl', '3xl']} mb="6" mt="10" color="whiteAlpha.900">
        Welcome Back!
      </Heading>

      <Text color="gray.400" fontSize={['sm', 'lg']} mb="2" textAlign="center">
        Login to The Family Office to continue.
      </Text>
      <Flex align="center" justify="center" w="full">
        <Box p={6} rounded="md" w="full">
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false
            }}
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
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email" color="gray.500">
                      Email/Username
                    </FormLabel>
                    <Field
                      as={ThemeInput}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      placeholder="Email/Username"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password" color="gray.500">
                      Password
                    </FormLabel>
                    <Field
                      as={ThemeInput}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      placeholder="Password"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Link
                    href="/"
                    color="primary.500"
                    textDecoration="underline"
                    mb={2}
                    _hover={{ textDecoration: 'none' }}
                  >
                    Forgot Password?
                  </Link>
                  <Button
                    type="submit"
                    bg="primary.500"
                    borderRadius="sm"
                    width="full"
                    color="gray.800"
                    _hover={{
                      bg: 'primary.600',
                      color: 'gray.850'
                    }}
                  >
                    Login
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Container>
  );
}
