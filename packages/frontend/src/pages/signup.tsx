import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Page } from '../components/page';
import * as Yup from 'yup';
import { TextInput } from '../components/textField';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../theme';


export function SignupPage() {
  const [signup, { data, loading }] = useMutation(signupQuery)
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    name: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email'),
    name: Yup.string().required('Name is required').min(3, 'Name should be at least 3 characters long '),
    password: Yup.string().required('Password is required').min(8, 'Password should be at least 8 characters long')
  })

  useEffect(() => {
    if (data?.createUser?.token) {
      localStorage.setItem('token', data.createUser.token);
      navigate('/dashboard');
    }
  }, [data, navigate]);

  return (
    <Page
      loading={loading}
    >
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async ({ email, password, name }) => {
            await signup({
              variables: {
                input: {
                  email,
                  password,
                  name
                }
              }
            })
          }}
        >
          <CardContent sx={{ display: 'flex', justifyContent: 'center', aligntItems: 'center', flexDirection: 'column', width: '40%', marginX: 'auto' }}>
            <Form>
              <Stack direction="column" spacing={3} sx={{ widht: "60%" }}>
                <Typography variant='h4' >Sign in</Typography>
                <TextInput name="name" label="name" />
                <TextInput name="email" label="Email" />
                <TextInput name="password" label="Password" />
                <Typography>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: 'none',
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Already have an account?
                  </Link>
                </Typography>
                <Button type="submit" onSubmit={(e) => e.preventDefault()} variant='contained'>Sign up</Button>
              </Stack>
            </Form>
          </CardContent>
        </Formik>
      </Card>
    </Page>
  )
}

const signupQuery = gql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
    }
  }
`)