class Dep {
  constructor () {
    this.subs = {};
  }
  addSubs (target) {
    this.subs[target.uid] = target;
  }
  notify () {
    console.log('notify');
    for (let uid in this.subs) {
      const target = this.subs[uid];
      target.update();
    }
  }
}

export default Dep;
