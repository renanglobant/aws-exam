import React from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { Question as QuestionType } from "../types/questions";

interface QuestionProps {
  question: QuestionType;
}

export default function QuestionCard({ question }: QuestionProps) {
  const [value, setValue] = React.useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {question.question}
        </Typography>
        <FormControl>
          <RadioGroup value={value} onChange={handleChange}>
            {question.answers.map((answer) => (
              <FormControlLabel
                key={answer.id}
                value={answer.id}
                control={<Radio />}
                label={answer.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
