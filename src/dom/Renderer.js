export default class {
  constructor(tree) {
    if (!tree) {
      throw new Error('No tree');
    }

    this.tree = tree
  }

  async render() {
    const { tree } = this;
    const pool = tree.genPool();
    for (const item of pool) {
      const { parent, content } = item;
      parent.appendChild(content);
    }

    return pool
  }
}