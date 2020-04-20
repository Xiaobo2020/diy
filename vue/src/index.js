class Vue {
  constructor (options) {
    this.$data = options.data;
    this.$el = document.getElementById(options.el);
  }
}

window.Vue = Vue;
