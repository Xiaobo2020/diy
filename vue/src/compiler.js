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
        if (!this.ignorable(child)) {
          fragment.appendChild(child);
        }
      })
    }
    return fragment;
  }
  ignorable (node) {
    const regText = /[\r\n\t]+/;
    if (node.nodeType === 8) {
      // 注释
      return true;
    } else if (node.nodeType === 3 && node.textContent.match(regText)) {
      // 文本节点，但是无效
      return true;
    } else {
      return false;
    }
  }

}

export default Compiler;
