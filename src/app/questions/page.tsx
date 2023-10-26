"use client";

import { useEffect, useState } from "react";

import { Container, Typography } from "@mui/material";

import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../services/questions";
import { Question } from "../types/questions";

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { questions } = await getQuestions();
      setQuestions(questions);
    };
    fetchQuestions();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Questions</Typography>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </Container>
  );
}
