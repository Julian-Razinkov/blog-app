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


export function LoginPage() {
  const [login, { data, loading }] = useMutation(loginQuery)
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required')
  })

  useEffect(() => {
    if (data?.loginUser?.token) {
      localStorage.setItem('token', data.loginUser.token);
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
          onSubmit={async ({ email, password }) => {
            await login({
              variables: {
                input: {
                  email,
                  password
                }
              }
            })
          }}
        >
          <CardContent sx={{ display: 'flex', justifyContent: 'center', aligntItems: 'center', flexDirection: 'column', width: '40%', marginX: 'auto' }}>
            <Form>
              <Stack direction="column" spacing={3} sx={{ widht: "60%" }}>
                <Typography variant='h4' >Sign in</Typography>
                <TextInput name="email" label="Email" />
                <TextInput name="password" label="Password" />
                <Typography>
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: 'none',
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Create account
                  </Link>
                </Typography>
                <Button type="submit" onSubmit={(e) => e.preventDefault()} variant='contained'>Login</Button>
              </Stack>
            </Form>
          </CardContent>
        </Formik>
      </Card>
    </Page>
  )
}

const loginQuery = gql(`
  mutation Login($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`)