import { dirtyShallowCopy } from '../utils/copy.js';
import { gen } from '../utils/uuid.js';

/**
 * @typedef {Object} TreeNode
 * @property {string} tag - Html tag (div for example).
 * @property {HTMLElement} [parent] - Parent dom node ref (html or something else).
 * @property {HTMLElement} [content] - Rendered dom node ref.
 * @property {Record<string, string>} [style] - Styled object for dom node.
 * @property {number} [x] - Count fo times dom node will be rendered.
 * @property {string} [class] - Dom node class name.
 * @property {TreeNode[]} [chs] - Children dom nodes.
 * @property {Boolean} [isCopied] - Flag witch indicate what node copied.
 * @property {Boolean} [isOrigin] - Flag witch indicate what node copied.
 * @property {string} [uuid]
 */

export default class {
  /** @type {Document} */
  spawner = document;

  /** @type {TreeNode[]} */
  pool = [];

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
      const { chs, x, tag, parent, class: cls, content, uuid: copiedUuid } = node;
      const domNode = content || spawner.createElement(tag);
      const uuid = gen();
      if (x) {
        for (let i = 1; i < x; i++) {
          const copiedChs = chs ? dirtyShallowCopy(chs) : [];
          const copiedNode = { parent, tag, chs: copiedChs, isCopied: true, uuid };
          cls && (copiedNode.class = cls);
          stack.push(copiedNode);
        }
        node.isOrigin = true;
      }
      node.content = domNode, node.uuid = copiedUuid || uuid, pool.push(node), delete node.chs;

      if (chs) {
        for (const ch of chs) {
          !ch.parent && (ch.parent = domNode);
          stack.push(ch);
        }
      }
    }

    return pool
  }
}