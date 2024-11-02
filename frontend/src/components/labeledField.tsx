import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export function LabeledField({ label, children }: { label: string, children: ReactNode }) {
  return (
    <Stack direction='column' spacing={1}>
      <Typography color="primary.main">{label}</Typography>
      {children}
    </Stack>
  )
}