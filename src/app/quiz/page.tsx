"use client";

import { useCallback, useEffect, useState } from "react";

import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";

import AppBar from "../components/AppBar";
import Loading from "../components/Loading";
import QuestionCard from "../components/QuestionCard";
import ScoreCard from "../components/ScoreCard";
import { getQuestions } from "../services/questions";
import { Question } from "../types/questions";
import { UserAnswer } from "../types/userAnswers";
import { getScore, getShuffledQuestionIds } from "./utils";

export default function Quiz() {
  const questionsQuantity = 10;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIdsToAnswer, setQuestionIdsToAnswer] = useState<number[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState<number>();
  const [userAnswers, setUserAnswers] = useState<UserAnswer>({});
  const [isLoading, setIsLoading] = useState(true);

  const currentId = questionIdsToAnswer[questionNumber];
  const currentQuestion = questions.find(({ id }) => currentId === id)!;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { questions: fetchedQuestions } = await getQuestions();
        const questionsId = getShuffledQuestionIds(fetchedQuestions).slice(
          0,
          questionsQuantity,
        );
        const examQuestions = fetchedQuestions.filter(({ id }) =>
          questionsId.includes(id),
        );
        setQuestions(examQuestions);
        setQuestionIdsToAnswer(questionsId);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const updateScore = () => {
    const currentScore = getScore(questions, userAnswers);
    setScore(currentScore);
  };

  const next = () => {
    if (questionNumber + 1 >= questionsQuantity) {
      updateScore();
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
    setScore(undefined);
    setUserAnswers({});
  };

  const checkQuestionsAnswered = () => {
    return userAnswers[currentId] > 0;
  };

  const buttonDisabled = !checkQuestionsAnswered();
  const showScore = score !== undefined;

  return (
    <>
      <AppBar title={`Quiz ${questionNumber + 1}/${questionsQuantity}`} />
      <Container sx={{ pt: 2, mb: 14 }}>
        {isLoading ? (
          <Loading />
        ) : showScore ? (
          <>
            <ScoreCard score={score} restart={restart} />
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
            <QuestionCard
              question={currentQuestion}
              updateSelectedAnswer={updateSelectedAnswer}
            />
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
