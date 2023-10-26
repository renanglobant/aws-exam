export type Question = {
  id: number;
  question: string;
  answers: Answer[];
  correct: number[];
};

export type Answer = {
  id: number;
  text: string;
};
