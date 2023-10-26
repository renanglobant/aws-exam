"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Clear as ClearIcon,
  NavigateNextRounded as NavigateNextRoundedIcon,
  EmojiEvents as EmojiEventsIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { Box, Button, Card, Container, Typography } from "@mui/material";

import AppBar from "../components/AppBar";
import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../services/questions";
import theme from "../theme";
import { Question } from "../types/questions";

const shuffle = () => Math.random() - 0.5;

const roundToTwoDecimalPlaces = (num: number) => {
  if (typeof num !== "number") {
    throw new Error("Invalid number");
  }

  if (num % 1 === 0) {
    return num;
  }

  return parseFloat(num.toFixed(2));
};

export default function Quiz() {
  const questionsQuantity = 10;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIdsToAnswer, setQuestionIdsToAnswer] = useState<number[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [grade, setGrade] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const { questions } = await getQuestions();
      setQuestions(questions);
      setQuestionIdsToAnswer(
        questions
          .map(({ id }) => id)
          .sort(shuffle)
          .slice(0, questionsQuantity),
      );
    };
    fetchQuestions();
  }, []);

  const getResult = () => {
    const corrects = Object.entries(userAnswers).reduce(
      (totalCorrect, [id, answer]) => {
        const question = questions.find((q) => q.id === +id);
        if (question && question.correct.includes(answer)) {
          return totalCorrect + 1;
        }
        return totalCorrect;
      },
      0,
    );
    const currentGrade = roundToTwoDecimalPlaces(
      (corrects * 100) / questionsQuantity,
    );
    setGrade(currentGrade);
    setShowResult(true);
  };

  const next = () => {
    if (questionNumber + 1 >= questionsQuantity) {
      getResult();
    } else {
      setQuestionNumber((number) => number + 1);
    }
  };

  const updateSelectedAnswer = useCallback(
    (questionId: number, answerId: number) => {
      if (!answerId) return;
      setUserAnswers((currentValue) => ({
        ...currentValue,
        [questionId]: answerId,
      }));
    },
    [setUserAnswers],
  );

  const restart = () => {
    setQuestionNumber(0);
    setShowResult(false);
    setGrade(0);
    setUserAnswers({});
  };

  const currentId =
    questionIdsToAnswer.length > 0 ? questionIdsToAnswer[questionNumber] : 0;
  const currentQuestion = questions.find(({ id }) => currentId === id)!;

  const checkQuestionsAnswered = () => {
    return userAnswers[currentId] > 0;
  };

  const buttonDisabled = !checkQuestionsAnswered();
  const approved = grade >= 70;

  return (
    <>
      <AppBar title={`Quiz ${questionNumber + 1}/${questionsQuantity}`} />
      <Container sx={{ pt: 2, mb: 14 }}>
        {showResult ? (
          <>
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
                  approved
                    ? theme.palette.success.dark
                    : theme.palette.error.dark
                }
              >
                {approved ? (
                  <EmojiEventsIcon sx={{ fontSize: 80 }} />
                ) : (
                  <ClearIcon sx={{ fontSize: 80 }} />
                )}
                <Typography variant="h3" align="center">
                  {grade}%
                </Typography>
                <Typography variant="h3" align="center" gutterBottom>
                  {grade >= 70 ? "Approved" : "Reproved"}
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
            {Object.keys(userAnswers).map((key) => {
              const question = questions.find(({ id }) => +key === id)!;
              const value = userAnswers[+key];
              return (
                <QuestionCard
                  question={question}
                  checkAnswer
                  initialValue={`${value}`}
                  key={key}
                />
              );
            })}
          </>
        ) : (
          <>
            {questions.length > 0 && (
              <QuestionCard
                question={currentQuestion}
                updateSelectedAnswer={updateSelectedAnswer}
              />
            )}
            <Box mt={2} display="flex" justifyContent="right">
              <Button
                variant="outlined"
                endIcon={<NavigateNextRoundedIcon />}
                disabled={buttonDisabled}
                onClick={next}
              >
                {questionNumber + 1 === questionsQuantity
                  ? "See result"
                  : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
