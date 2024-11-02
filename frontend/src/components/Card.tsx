import { Card, CardContent, CardMedia, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export interface BlogCardProps {
  title?: string | null,
  description?: string | null,
  image: string,
  id: string
}

export function BlogCard(props: BlogCardProps) {
  const navigate = useNavigate()

  return (
    <Card sx={{ height: '100%' }} onClick={() => navigate(`/dashboard/${props.id}`)}>
      <CardMedia
        component='img'
        sx={{
          maxHeight: '300px'
        }}
        image="../public/cardTest.jpg"
      />
      <Divider />
      <CardContent>
        <Typography color="text.primary">
          {props.title}
        </Typography>
        <Typography color="secondary.main">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  )
}