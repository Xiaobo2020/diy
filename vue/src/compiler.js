class Compiler {
  constructor (context) {
    this.$el = context.$el;
    this.data = context.$data;
    if (this.$el) {
      // 将原始模板dom转换为文档片段
      const $fragment = this.nodeToFragment(this.$el);
    }
  }
  nodeToFragment (node) {
    const fragment = document.createDocumentFragment();
    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach(child => {
        console.log(child);
      })
    }
    return fragment;
  }
}

export default Compiler;
