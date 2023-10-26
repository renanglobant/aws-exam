import React, { useEffect } from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import theme from "../theme";
import { Question as QuestionType } from "../types/questions";

interface QuestionProps {
  question: QuestionType;
  showAnswer?: boolean;
  checkAnswer?: boolean;
  initialValue?: string;
  updateSelectedAnswer?: (questionId: number, answerId: number) => void;
}

export default function QuestionCard({
  question,
  showAnswer = false,
  checkAnswer = false,
  initialValue = "",
  updateSelectedAnswer,
}: QuestionProps) {
  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    if (!!initialValue && !value) setValue(initialValue);
  }, [initialValue, value]);

  useEffect(() => {
    setValue("");
  }, [question]);

  useEffect(() => {
    updateSelectedAnswer?.(question.id, +value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!showAnswer) setValue("");
  }, [showAnswer]);

  useEffect(() => {
    if (!checkAnswer) {
      setValue("");
    }
  }, [checkAnswer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!showAnswer && !checkAnswer) {
      setValue(event.target.value);
    }
  };

  return (
    <Card sx={{ mt: 1, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {question.question}
        </Typography>
        <FormControl>
          <RadioGroup value={value} onChange={handleChange}>
            {question.answers.map((answer) => {
              const isCorrectAnswer = question.correct.includes(+value);
              const isSelectedAnswer = answer.id === +value;
              const checked =
                (showAnswer && question.correct.includes(answer.id)) ||
                (!showAnswer && !checkAnswer && isSelectedAnswer) ||
                (checkAnswer && question.correct.includes(answer.id));

              const getColor = () => {
                if (showAnswer || checkAnswer) {
                  return "success";
                }
                return "primary";
              };

              const getLabelColor = () => {
                if (showAnswer || checkAnswer) {
                  const successColor = theme.palette.success.dark;
                  const errorColor = theme.palette.error.dark;

                  if (isSelectedAnswer && checkAnswer) {
                    return isCorrectAnswer ? successColor : errorColor;
                  }

                  if (question.correct.includes(answer.id)) {
                    return successColor;
                  }
                }

                return "inherit";
              };

              const color = getColor();
              const labelColor = getLabelColor();
              return (
                <FormControlLabel
                  key={answer.id}
                  value={answer.id}
                  control={<Radio checked={checked} color={color} />}
                  label={
                    <Typography color={labelColor}>{answer.text}</Typography>
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
