import Observer from "./observer";

class Vue {
  constructor (options) {
    this.$data = options.data || {};
    this.$el = document.getElementById(options.el);

    // 数据代理
    this._proxyData(this.$data);

    // 数据劫持
    new Observer(this.$data);
  }
  _proxyData (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return data[key];
        },
        set (newValue) {
          data[key] = newValue;
        }
      })
    })
  }
}

window.Vue = Vue;
