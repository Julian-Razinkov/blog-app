import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { BlogCard } from "../components/Card";
import Grid from '@mui/material/Grid2'
import { Page } from "../components/page";
import { useAuth } from "../context/authContext";
import { Typography } from "@mui/material";

export function Dashboard() {

  const { data, loading, error } = useQuery(BLOGS);
  const { name } = useAuth()

  if (error) {
    console.log(error)
    return <span>Oopsie...</span>
  }

  return (
    <Page loading={loading}>
      <Typography variant="h2">{name}</Typography>
      <Grid container spacing={3} gridAutoRows='1fr' sx={{ paddingY: 3 }} justifyContent="center">
        {data?.getBlogs.map(blog => (
          <Grid key={blog.id} maxWidth={400} size={{ xs: 12, sm: 6, md: 4 }}>
            <BlogCard title={blog.title} description={blog.description ?? ''} image={blog.body} id={blog.id} />
          </Grid>
        ))}
      </Grid>
    </Page >
  )
}

const BLOGS = gql(`
 query getBlogs {
  getBlogs {
    id
    title
    description
    body
  }
}
`)