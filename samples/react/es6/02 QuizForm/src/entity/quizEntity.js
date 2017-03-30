export class QuizEntity {
  constructor() {
    this.questionA = new Question(false);
    this.questionB = new Question(false);
    this.questionC = new Question(false);
  }
}

export class Question {
  constructor(isSelected) {
    this.isSelected = isSelected;
  }
}
