import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { theme } from '../theme'
import { Loading } from "./loading";
import { AppBar } from "./appbar";

export function Page({ children, loading = false }: { children: ReactNode, loading?: boolean }) {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, height: '100%' }}>
      <Box flexGrow={1}>
        <AppBar />
      </Box>

      <Box sx={{ width: '80%', marginX: 'auto', paddingY: '150px' }}>
        {loading && <Loading />}
        {children}
      </Box>
    </Box>
  )
}
