import * as React from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { ContainerQuizForm } from './quizForm/quizForm.container';

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk),
);

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
          <ContainerQuizForm />
        </div>
      </Provider>
    );
  }
}
