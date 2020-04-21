class Compiler {
  constructor (context) {
    this.$el = context.$el;
    this.data = context.$data;
    if (this.$el) {
      // 将原始模板dom转换为文档片段
      const $fragment = this.nodeToFragment(this.$el);

      // 将文档片段中的模板dom进行编译
      this.compiler($fragment);
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
    const textRegExp = /[\r\n\t]+/;
    if (node.nodeType === 8) {
      // 注释
      return true;
    } else if (node.nodeType === 3 && node.textContent.match(textRegExp)) {
      // 文本节点，但是无效
      return true;
    } else {
      return false;
    }
  }
  compiler (node) {
    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach(child => {
        if (child.nodeType === 1) {
          this.compilerElementNode(child);
        } else if (child.nodeType === 3) {
          this.compilerTextNode(child);
        }
      })
    }
  }
  compilerElementNode (node) {
    this.compiler(node);
  }
  compilerTextNode (node) {
    const text = node.textContent.trim();
    if (text) {
      const expr = this.parseText(text);
      console.log(expr);
    }
  }
  parseText (text) {
    const exprRegExp = /\{\{(.+?)\}\}/g;
    const spices = text.split(exprRegExp);
    const matches = text.match(exprRegExp);
    
    const token = spices.map(item => {
      if (matches.indexOf('{{' + item + '}}') !== -1) {
        return '(' + item + ')';
      } else {
        return '`' + item + '`';
      }
    });
    return token.join('+')
  }
}

export default Compiler;
