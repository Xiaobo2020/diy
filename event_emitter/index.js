function EventEmitter () {
  this._events = {};
}

EventEmitter.prototype.on = function (event, fn) {
  if (Array.isArray) {
    for (let i = 0; i < event.length; i++) {
      this.on(event[i], fn);
    }
    return;
  }
  (this._events[event] || (this._events[event] = [])).push(fn);
}

EventEmitter.prototype.off = function (event, fn) {
  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      this.off(event[i], fn);
    }
    return;
  }
  const cbs = this._events[event];
  if (!cbs) {
    return;
  }
  if (!fn) {
    this._events[event] = null;
    return;
  }
  this._events[event] = cbs.filter(cb => cb !== fn);
}

EventEmitter.prototype.once = function (event, fn) {
  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      this.once(event[i], fn);
    }
    return;
  }
  if (!fn) {
    return;
  }
  const _fn = (...args) => {
    this.off(event, _fn);
    fn(...args);
  };
  this.on(event, _fn);
}

EventEmitter.prototype.emit = function (event, ...args) {
  const cbs = this._events[event];
  if (!cbs) {
    return;
  }
  for (let i = 0; i < cbs.length; i++) {
    cbs[i](...args);
  }
}

export default EventEmitter;
