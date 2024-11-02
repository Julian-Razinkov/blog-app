import { AppBar as MuiAppBar, Button, Divider, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { theme } from '../theme'


export function AppBar() {
  const currentPage = useLocation();
  const navigate = useNavigate()

  return (
    <MuiAppBar
      component='nav'
      sx={{
        width: "100%",
        mx: 'auto',
        boxShadow: 'none'
      }}
    >
      <Toolbar disableGutters sx={{ alignItems: 'center', justifyContent: 'space-between', paddingX: '2rem' }}>
        <Link to="/dashboard">
          <img src="../public/logo.png" width={143} height={54} />
        </Link>
        <Stack direction='row' spacing={4} alignItems='center' sx={{ ml: 10, width: '80%' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '18px' }} >
            <Link
              to={'/dashboard'}
              style={{
                textDecoration: 'none',
                color: currentPage.pathname.includes('/dashboard') ? theme.palette.primary.main : theme.palette.text.primary
              }}
            >
              Dashboard
            </Link>
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '18px' }} >
            <Link
              to={'/settings'}
              style={{
                textDecoration: 'none',
                color: currentPage.pathname.includes('/settings') ? theme.palette.primary.main : theme.palette.text.primary
              }}
            >
              Settings
            </Link>
          </Typography>
        </Stack>
        <Button
          variant='contained'
          onClick={() => navigate('/dashboard/new-post')}
        >
          New Post
        </Button>
      </Toolbar>
      <Divider />
    </MuiAppBar>
  )
}