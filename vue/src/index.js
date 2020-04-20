import Observer from "./observer";

class Vue {
  constructor (options) {
    this.$data = options.data || {};
    this.$el = document.getElementById(options.el);

    // 数据劫持
    new Observer(this.$data);
  }
}

window.Vue = Vue;
