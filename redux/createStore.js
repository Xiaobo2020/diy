function createStore (reducer, preloadState, enhancer) {
  if (typeof preloadState === 'function' && enhancer === undefined) {
    enhancer = preloadState;
    preloadState = undefined;
  }

  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadState);
  }

  let currentReducer = reducer;
  let currentState = preloadState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  function getState () {
    if (isDispatching) {
      throw new Error('is dispatching ...');
    }
    return currentState;
  }

  function dispatch (action) {
    isDispatching = true;
    try {
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function ensureCanMutateNextListeners () {
    if (currentListeners === nextListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function subscribe (listener) {

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe () {
      ensureCanMutateNextListeners();
      nextListeners = nextListeners.filter(cb => cb !== listener);
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;
