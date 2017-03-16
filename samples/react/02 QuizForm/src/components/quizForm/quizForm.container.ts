import { connect } from 'react-redux';
import { QuizForm } from './quizForm';
import { quizUIInputCompleted } from '../../actions/quizUIInputCompleted';
import { QuizEntity } from '../../entity/quizEntity';
import { quizResolveStart } from '../../actions/quizResolveStart';
import { resetQuizResolveCompleted } from '../../actions/resetQuizResolveCompleted';

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz.quiz,
    quizResult: state.quiz.quizResult,
    quizResolveCompleted: state.quiz.quizResolveCompleted
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedQuestionHandler: (questionId: string, value: boolean) => {
      return dispatch(quizUIInputCompleted(questionId, value));
    },
    quizResolve: (quiz: QuizEntity) => {
      return dispatch(quizResolveStart(quiz));
    },
    resetQuizResolveCompleted: () => {
      return dispatch(resetQuizResolveCompleted());
    }
  }
};

export let ContainerQuizForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizForm);
