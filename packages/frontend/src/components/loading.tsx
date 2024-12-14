import { Box } from "@mui/material";

export function Loading() {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <img src="/loading.gif" alt="loading" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    </Box>
  )
}
