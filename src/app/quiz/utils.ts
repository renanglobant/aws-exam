import { Question } from "../types/questions";
import { UserAnswer } from "../types/userAnswers";

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

export const getScore = (questions: Question[], userAnswers: UserAnswer) => {
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
  const questionsQuantity = questions.length;
  const currentScore = roundToTwoDecimalPlaces(
    (corrects * 100) / questionsQuantity,
  );
  return currentScore;
};

export const getShuffledQuestionIds = (questions: Question[]) =>
  questions.map(({ id }) => id).sort(shuffle);
