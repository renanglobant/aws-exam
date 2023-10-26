import Link from "next/link";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import {
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";

interface AppBarProps {
  title?: string;
}

export default function AppBar({ title = "" }: AppBarProps) {
  return (
    <>
      <MuiAppBar position="fixed" component="nav">
        <Toolbar>
          <Button
            startIcon={<ArrowBackIosRoundedIcon />}
            color="inherit"
            LinkComponent={Link}
            href="/"
          >
            Home
          </Button>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </>
  );
}
