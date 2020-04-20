import compose from './compose';

function applyMiddleware (...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error('constructing ...');
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    const chains = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chains)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  }
}

export default applyMiddleware;
