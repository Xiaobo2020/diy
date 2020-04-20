function thunk ({dispatch, getState}) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        // 调用最全的dispatch重新触发一次
        return action(dispatch, getState);
      }
      return next(action);
    }
  }
}

export default thunk;
