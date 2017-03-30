import React from 'react';
import toastr from 'toastr';
import { Question } from '../common/question';
import { QuizEntity } from '../../entity/quizEntity';
import { FieldValidationResult } from 'lc-form-validation';

export class QuizForm extends React.Component {

  static propTypes = {
    quiz: React.PropTypes.instanceOf(QuizEntity).isRequired,
    quizResult: React.PropTypes.instanceOf(FieldValidationResult).isRequired,
    onSelectedQuestionHandler: React.PropTypes.func.isRequired,
    quizResolve: React.PropTypes.func.isRequired,
    quizResolveCompleted: React.PropTypes.bool.isRequired,
    resetQuizResolveCompleted: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSelectedQuestion = this.onSelectedQuestion.bind(this);
    this.onQuizResolve = this.onQuizResolve.bind(this);
  }

  onSelectedQuestion(event) {
    const { name, checked } = event.target;
    this.props.onSelectedQuestionHandler(name, checked);
  }

  onQuizResolve(event) {
    event.preventDefault();
    this.props.quizResolve(this.props.quiz);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.quizResolveCompleted !== nextProps.quizResolveCompleted && nextProps.quizResolveCompleted) {
      this.showToastr(nextProps);
      this.props.resetQuizResolveCompleted();
    }
  }

  showToastr(nextProps) {
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
