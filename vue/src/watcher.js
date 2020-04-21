let uid = 0;
class Watcher {
  constructor (expr, scope, cb) {
    this.expr = expr;
    this.scope = scope;
    this.cb = cb;
    this.uid = uid++;
    this.update();
  }
  update () {
    const newValue = this.get();
    this.cb && this.cb(newValue);
  }
  get () {
    const newValue = this.computeExpression(this.expr, this.scope);
    return newValue;
  }
  computeExpression (expr, scope) {
    const fn = new Function('scope', 'with(scope){return ' + expr + '}');
    return fn(scope);
  }
}

export default Watcher;
