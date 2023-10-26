"use client";

import { useEffect, useState } from "react";

import { Container } from "@mui/material";

import AppBar from "../components/AppBar";
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
    <>
      <AppBar title="Question" />
      <Container sx={{ pt: 2 }}>
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </Container>
    </>
  );
}
