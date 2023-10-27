import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      top={0}
      left={0}
      height="100%"
      width="100%"
      position="fixed"
    >
      <CircularProgress />
    </Box>
  );
}
