import Image from "next/image";
import Link from "next/link";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

import awsLogo from "./ assets/aws.svg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        className={styles.center}
      >
        <Grid item xs={12}>
          <Image src={awsLogo} alt="AWS Logo" width={65} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            Exam Practice
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            p={2}
            m="auto"
            display="flex"
            justifyContent="space-evenly"
            maxWidth={400}
            gap={1}
            flexWrap="wrap"
          >
            <Button variant="outlined" component={Link} href="quiz">
              Start Quiz
            </Button>
            <Button variant="outlined" component={Link} href="questions">
              Questions
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
