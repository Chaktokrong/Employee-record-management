import { Stack, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function LoadingPage() {
  return (
    <>
      <Stack direction="column" justifyContent="center" height="300px">
        <Stack direction="row" justifyContent="center">
          <CircularProgress />
        </Stack>
      </Stack>
    </>
  );
}
