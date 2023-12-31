"use client";

import { useEffect, useState } from "react";

import {
  Check as CheckIcon,
  RestartAlt as RestartAltIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";

import AppBar from "../components/AppBar";
import Loading from "../components/Loading";
import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../services/questions";
import { Question } from "../types/questions";

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { questions } = await getQuestions();
        setQuestions(questions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const checkAllQuestionsAnswered = () => {
    const questionIds = questions.map(({ id }) => id);

    return questionIds.every((id) => !!selectedAnswers[id]);
  };

  const toggleShowAnswers = () => {
    if (checkAnswer) {
      setCheckAnswer(false);
    }
    setShowAnswer((value) => !value);
  };

  const toggleCheckAnswers = () => {
    if (showAnswer) {
      setShowAnswer(false);
    }
    setCheckAnswer((value) => !value);
  };

  const updateSelectedAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers((currentValue) => ({
      ...currentValue,
      [questionId]: answerId,
    }));
  };
  const disableCheckButton = !checkAllQuestionsAnswered();

  return (
    <>
      <AppBar title="Questions" />
      <Container sx={{ pt: 2, mb: 14 }}>
        {isLoading ? (
          <Loading />
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              showAnswer={showAnswer}
              checkAnswer={checkAnswer}
              updateSelectedAnswer={updateSelectedAnswer}
            />
          ))
        )}
      </Container>
      {questions.length > 0 && (
        <Box
          position="fixed"
          m={1}
          bottom={16}
          right={24}
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <Button
            variant="outlined"
            color="success"
            startIcon={checkAnswer ? <RestartAltIcon /> : <CheckIcon />}
            disabled={disableCheckButton}
            onClick={toggleCheckAnswers}
          >
            {checkAnswer ? "Restart Exam" : "Check Answers"}
          </Button>
          <Button
            variant="outlined"
            color="info"
            startIcon={showAnswer ? <RestartAltIcon /> : <VisibilityIcon />}
            onClick={toggleShowAnswers}
          >
            {showAnswer ? "Restart Exam" : "Show Answers"}
          </Button>
        </Box>
      )}
    </>
  );
}
