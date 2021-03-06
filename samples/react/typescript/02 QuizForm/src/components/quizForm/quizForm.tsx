import * as React from 'react';
import * as toastr from 'toastr';
import { Question } from '../common/question';
import { QuizEntity } from '../../entity/quizEntity';
import { FieldValidationResult } from 'lc-form-validation';

interface Props extends React.Props<QuizForm> {
  quiz: QuizEntity;
  quizResult: FieldValidationResult;
  onSelectedQuestionHandler: (questionId: string, value: boolean) => void;
  quizResolve: (quiz: QuizEntity) => void;
  quizResolveCompleted: boolean;
  resetQuizResolveCompleted: () => void;
}

export class QuizForm extends React.Component<Props, {}> {
  constructor(props) {
    super(props);

    this.onSelectedQuestion = this.onSelectedQuestion.bind(this);
    this.onQuizResolve = this.onQuizResolve.bind(this);
  }

  private onSelectedQuestion(event) {
    this.props.onSelectedQuestionHandler(event.target.name, event.target.checked);
  }

  private onQuizResolve(event) {
    event.preventDefault();
    this.props.quizResolve(this.props.quiz);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.quizResolveCompleted !== nextProps.quizResolveCompleted && nextProps.quizResolveCompleted) {
      this.showToastr(nextProps);
      this.props.resetQuizResolveCompleted();
    }
  }

  private showToastr(nextProps: Props) {
    toastr.clear();
    if (nextProps.quizResult.succeeded) {
      toastr.success('Test passed');
    } else {
      toastr.error(nextProps.quizResult.errorMessage);
    }
  }

  render() {
    return (
      <div>
        <form>
          <h1>Mark any question as valid</h1>
          <Question
            name="questionA"
            text="Question A"
            isSelected={this.props.quiz.questionA.isSelected}
            onChange={this.onSelectedQuestion} />

          <Question
            name="questionB"
            text="Question B"
            isSelected={this.props.quiz.questionB.isSelected}
            onChange={this.onSelectedQuestion} />

          <Question
            name="questionC"
            text="Question C"
            isSelected={this.props.quiz.questionC.isSelected}
            onChange={this.onSelectedQuestion} />

          <input type="submit" value="Validate" className="btn btn-default"
            onClick={this.onQuizResolve} />
        </form>
      </div>
    );
  }
}
