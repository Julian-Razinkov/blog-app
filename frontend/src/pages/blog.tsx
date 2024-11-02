import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { Page } from "../components/page";
import { Avatar, Box, Chip, Divider, Paper, Stack, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { ArrowBack, Delete, MoreVert, } from '@mui/icons-material';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function BlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  if (!blogId) throw new Error('The blog id must be provided')

  const { data, loading } = useQuery(blogQuery, {
    variables: {
      id: blogId
    },
  })

  const [deleteBlog] = useMutation(deleteBlogQuery, {
    variables: {
      id: blogId
    },
    refetchQueries: [
      'getBlogs'
    ]
  })

  if (data == null) return

  const blog = data.getBlog

  return (
    <Page loading={loading}>
      <Paper sx={{ width: '100%', height: '100%', padding: '30px', mt: '10px' }}>
        <Stack direction="column" spacing={'20px'} alignItems='center'>
          <Stack direction="row" spacing={3} alignItems={'center'} width="100%" justifyContent={'center'}>
            <Stack direction="row" spacing={3} alignItems={'center'} width="90%" justifyContent={'center'}>
              <Chip label={blog.topic} sx={{ maxWidth: "150px" }} color="primary" />
              <Typography>{format(blog.createdAt, "MMM d, yyy")}</Typography>
            </Stack>
            <IconButton onClick={(event) => {
              setAnchorEl(event.currentTarget);
              setOpenOptions(!openOptions)
            }} sx={{ color: theme => theme.palette.secondary.main }}>
              <MoreVert />
            </IconButton>
            {openOptions && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: '297px',
                  left: '737px',
                  overflow: 'hidden',
                  padding: '10px'
                }}
              >
                <Menu
                  open={openOptions}
                  anchorEl={anchorEl}
                  onClose={() => {
                    setOpenOptions(false);
                    setAnchorEl(null)
                  }}
                >
                  <MenuItem onClick={() => {
                    deleteBlog()
                    navigate('../')
                    setOpenOptions(false)
                  }}>
                    Delete Post
                  </MenuItem>
                </Menu>
              </Paper>
            )}
          </Stack>
          <Typography variant="h2">{blog.title}</Typography>
          <Typography variant="h6">{blog.description}</Typography>
          <Stack direction="row" alignItems='center' spacing={3}>
            <Avatar src="../public/cardTest.jpg" />
            <Typography>{blog.author.name}</Typography>
          </Stack>
          <img src='../public/cardTest.jpg' style={{
            borderRadius: '10px',
            height: '300px',
            width: 'auto'
          }} />
        </Stack>
        <Box sx={{ width: '60%', mx: 'auto', mt: '30px' }}>
          <Typography fontSize={'20px'}>{blog.body}</Typography>
        </Box>
      </Paper>
    </Page >
  )

}

const blogQuery = gql(`
  query Blog($id: ID!){
    getBlog(id: $id){
      title,
      description
      topic
      body
      createdAt
      author {
        name
      }
    }
  }
`)

const deleteBlogQuery = gql(`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`)