import {
  Clear as ClearIcon,
  EmojiEvents as EmojiEventsIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";

import theme from "../theme";

interface ScoreCardProps {
  score: number;
  restart: () => void;
}

export default function ScoreCard({ score, restart }: ScoreCardProps) {
  const isApproved = (score ?? 0) >= 70;

  return (
    <Card
      sx={{
        mt: 1,
        p: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color={
          isApproved ? theme.palette.success.dark : theme.palette.error.dark
        }
      >
        {isApproved ? (
          <EmojiEventsIcon sx={{ fontSize: 80 }} />
        ) : (
          <ClearIcon sx={{ fontSize: 80 }} />
        )}
        <Typography variant="h3" align="center">
          {score}%
        </Typography>
        <Typography variant="h3" align="center" gutterBottom>
          {score >= 70 ? "Approved" : "Reproved"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={restart}
        >
          Restart exam
        </Button>
      </Box>
    </Card>
  );
}
