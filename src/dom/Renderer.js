export default class {
  spawner = document;
  constructor(tree, styler) {
    if (!tree) {
      throw new Error('No tree');
    }

    if (!styler) {
      throw new Error('No styler');
    }

    this.tree = tree;
    this.styler = styler;
  }

  /**
   * @param {string} cssString;
   */
  async createStyleNode(cssString) {
    const { spawner } = this;
    const styleNode = spawner.createElement('style');
    spawner.head.appendChild(styleNode);
    styleNode.appendChild(spawner.createTextNode(cssString));
  }

  async render() {
    const { tree, styler } = this;
    const pool = tree.genPool();

    const cssString = await styler.linkPool(pool);
    await this.createStyleNode(cssString);

    for (const item of pool) {
      const { parent, content } = item;
      parent.appendChild(content);
    }

    return pool;
  }
}