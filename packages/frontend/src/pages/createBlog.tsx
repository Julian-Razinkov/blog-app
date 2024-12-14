import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import React from 'react'
import { Page } from "../components/page";
import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { TextInput } from "../components/textField";

export function CreateBlog() {
  const [create] = useMutation(createBlogMutation, {
    refetchQueries: [
      'getBlogs'
    ]
  });
  const navigate = useNavigate()

  const initialValues = {
    title: '',
    body: '',
    topic: '',
    description: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(2, "The title should be at least 1 character long").max(150, 'The title can\'t be longer than 150 characters'),
    body: Yup.string().required('Body is required').min(30, 'The body should be at least 30 characters long').max(50000, 'The body can\'t be longer than 5000 characters '),
    topic: Yup.string().min(2, 'Topic should be at least 2 characters').max(20, 'Topic cant be longer than 20 characters'),
    description: Yup.string().min(5, 'Description should be at least 5 characters').max(300, 'Description should not be longer than 300 characters')
  })

  return (
    <Page loading={false}>
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          isInitialValid={false}
          onSubmit={({ title, body, topic, description }, { setSubmitting }) => {
            console.log(title, body, topic, description)
            create({
              variables: {
                input: {
                  authorId: 'mock',
                  body,
                  title,
                  topic,
                  description,
                }
              }
            })
            setSubmitting(false);
            navigate('../')
          }}
        >
          <Form>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', aligntItems: 'center', flexDirection: 'column', width: '40%', marginX: 'auto' }} >
              <Stack direction="column" spacing={5}>
                <TextInput name="title" label="Title" />
                <TextInput name="description" label="Description" />
                <TextInput
                  name="body"
                  label="Body"
                  multiline
                  rows={5}
                />
                <TextInput name="topic" label="Topic" />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Stack>
            </CardContent>
          </Form>
        </Formik>

      </Card>
    </Page>
  )
}

const createBlogMutation = gql(`
  mutation CreateBlog($input: BlogCreateInput!) {
    createBlog(input: $input) {
      title,
      description,
      body,
      topic
    }
  }
`)
