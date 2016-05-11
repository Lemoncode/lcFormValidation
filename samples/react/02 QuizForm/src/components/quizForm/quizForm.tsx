import * as React from 'react';
import * as toastr from 'toastr';
import { Question } from '../common/question';
import { QuizEntity } from '../../entity/quizEntity';
import { FieldValidationResult } from 'lc-form-validation';

interface Props extends React.Props<QuizForm> {
  quiz : QuizEntity;
  quizResult : FieldValidationResult;
  onSelectedQuestionHandler : (questionId : string, value : boolean) => void;
  quizResolve : (quiz : QuizEntity) => void;
  quizResolveCompleted : boolean;
  resetQuizResolveCompleted : () => void;
}

export class QuizForm extends React.Component<Props, {}> {
  private onSelectedQuestion(event) {
    this.props.onSelectedQuestionHandler(event.target.name, event.target.checked);
  }

  private onQuizResolve(event) {
    event.preventDefault();
    this.props.quizResolve(this.props.quiz);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.quizResolveCompleted != nextProps.quizResolveCompleted && nextProps.quizResolveCompleted) {
      this.showToastr(nextProps);
      this.props.resetQuizResolveCompleted();
    }
  }

  private showToastr(nextProps: Props) : void {
    if (nextProps.quizResult.succeeded) {
      toastr.success('Test passed');
    } else {
      toastr.error(nextProps.quizResult.errorMessage);
    }
  }

  public render() {
    return (
      <div>
        <form>
          <h1>Mark a question as valid</h1>
          <Question
            name="questionA"
            text="Question A"
            isSelected={this.props.quiz.questionA.isSelected}
            onChange={(event) => {
              this.onSelectedQuestion(event);
            }}/>

          <Question
            name="questionB"
            text="Question B"
            isSelected={this.props.quiz.questionB.isSelected}
            onChange={(event) => {
              this.onSelectedQuestion(event);
            }}/>

          <Question
            name="questionC"
            text="Question C"
            isSelected={this.props.quiz.questionC.isSelected}
            onChange={(event) => {
              this.onSelectedQuestion(event);
            }}/>

            <input type="submit" value="Validate" className="btn btn-default"
              onClick={(event) => {
                this.onQuizResolve(event);
              }}/>
        </form>
      </div>
    );
  }
}
