/**
 * @typedef {Object} TreeNode
 * @property {string} tag
 * @property {HTMLElement} parent - Parent element (html or something else)
 * @property {HTMLElement} content
 * @property {TreeNode[]} [chs]
 */

export default class {
  spawner = document;
  /** @type {TreeNode[]} */
  pool = []

  /**
   * @param {TreeNode} scheme
   */
  constructor(scheme) {
    if (!scheme) {
      throw new Error('No scheme');
    }

    this.scheme = scheme;
  }

  genPool() {
    const { spawner, scheme, pool } = this;
    const stack = [scheme];
    while (stack.length) {
      const node = /** @type {TreeNode} */ (stack.pop());
      const { chs, tag } = node;
      const domNode = spawner.createElement(tag);
      node.content = domNode, pool.push(node), delete node.chs;

      if (chs) {
        for (const ch of chs) {
          !ch.parent && (ch.parent = domNode);
          stack.push(ch);
        }
      }
    }

    return  pool
  }
}