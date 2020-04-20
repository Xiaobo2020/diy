class Observer {
  constructor (data) {
    this.data = data;
    // 遍历对象，完成数据劫持
    this.walk(this.data);
  }
  // 遍历
  walk (data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  // 数据劫持
  defineReactive (scope, key, value) {
    Object.defineProperty(scope, key, {
      enumerable: true,
      configurable: false,
      get () {
        console.log('get', value);
        return value;
      },
      set (newValue) {
        console.log('set', newValue);
        value = newValue;
      }
    });
    // 深层对象数据劫持
    this.walk(value);
  }
}

export default Observer;
