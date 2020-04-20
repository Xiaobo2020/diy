const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function SPromise (executor) {
  this._status = PENDING;
  this._value = undefined;
  this._listeners = [];

  const resolve = (value) => {
    if (this._status === PENDING) {
      this._status = RESOLVED;
      this._value = value;
      for (let i = 0; this._listeners.length; i++) {
        this._listeners[i]();
      }
    }
  }
  const reject = (reason) => {
    if (this._status === PENDING) {
      this._status = REJECTED;
      this._value = reason;
      for (let i = 0; this._listeners.length; i++) {
        this._listeners[i]();
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

const isFunction = fn => typeof fn === 'function';

SPromise.prototype.then = function (onResolve, onReject) {
  const resolveHandler = isFunction(onResolve) ? onResolve : v => v;
  const rejectHandler = isFunction(onReject) ? onReject : r => {
    throw r;
  }
  return new SPromise((resolve, reject) => {
    const listener = () => {
      try {
        const x = 
          this._status === RESOLVED 
            ? resolveHandler(this._value) 
            : rejectHandler(this._value);
        resolve(x);
      } catch (e) {
        reject(e);
      }
    }
    if (this._status === PENDING) {
      this._listeners.push(listener);
    } else {
      listener();
    }
  });
}

SPromise.all = function (tasks) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(task)) {
      return reject('非法入参');
    }
    const result = [];
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].then(
        v => {
          result[i] = v;
          count++;
          if (count === tasks.length) {
            resolve(result);
          }
        },
        r => {
          reject(r);
        }
      );
    }
  });
}

export default SPromise;
