(() => {
  // src/schemas/manyDivs.js
  var COL_COUNT = 6;
  var DIV_SIZE = 230;
  var INNER_GAP = 40;
  var manyDivs_default = {
    tag: "div",
    parent: document.body,
    style: {
      display: "grid",
      "grid-template-columns": `repeat(${COL_COUNT}, ${DIV_SIZE}px)`
    },
    chs: [
      {
        style: {
          width: `${DIV_SIZE}px`,
          height: `${DIV_SIZE}px`,
          "background-color": "navy",
          border: "1px solid white",
          display: "flex",
          "justify-content": "center",
          "align-items": "center"
        },
        tag: "div",
        x: 8e4,
        chs: [
          {
            tag: "div",
            style: {
              display: "flex",
              width: `${DIV_SIZE - INNER_GAP}px`,
              height: `${DIV_SIZE - INNER_GAP}px`,
              "background-color": "yellow"
            }
          }
        ]
      }
    ]
  };

  // src/utils/copy.js
  var dirtyShallowCopy = (obj) => JSON.parse(JSON.stringify(obj));

  // src/utils/uuid.js
  var gen = (len = 7) => "uuid-" + Math.random().toString(36).substring(2, len) + Math.random().toString(36).substring(2, len);

  // src/structs/Tree.js
  var Tree_default = class {
    /** @type {Document} */
    spawner = document;
    /** @type {TreeNode[]} */
    pool = [];
    /**
     * @param {TreeNode} scheme
     */
    constructor(scheme) {
      if (!scheme) {
        throw new Error("No scheme");
      }
      this.scheme = scheme;
    }
    genPool() {
      const { spawner, scheme, pool } = this;
      const stack = [scheme];
      while (stack.length) {
        const node = (
          /** @type {TreeNode} */
          stack.pop()
        );
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
      return pool;
    }
  };

  // src/dom/Renderer.js
  var Renderer_default = class {
    spawner = document;
    constructor(tree, styler) {
      if (!tree) {
        throw new Error("No tree");
      }
      if (!styler) {
        throw new Error("No styler");
      }
      this.tree = tree;
      this.styler = styler;
    }
    /**
     * @param {string} cssString;
     */
    async createStyleNode(cssString) {
      const { spawner } = this;
      const styleNode = spawner.createElement("style");
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
  };

  // src/styler/index.js
  var styler_default = class {
    //`.${uuid} ${JSON.stringify(item.style)}`.replaceAll(',', ';').replaceAll('"', '')
    parseParams(uuid, style) {
      let stringChunk = `
 .${uuid} {`;
      for (const [key, value] of Object.entries(style)) {
        stringChunk += `
  ${key}: ${value};`;
      }
      return `${stringChunk} 
 } 
`;
    }
    async linkPool(pool) {
      let cssString = "";
      for (const item of pool) {
        if (!item.style && !item.class && !item.isCopied)
          continue;
        item.content.className = item.class || item.uuid;
        item.style && (cssString += this.parseParams(item.uuid, item.style));
      }
      return cssString;
    }
  };

  // src/dom/render.js
  var render_default = async (scheme) => {
    const tree = new Tree_default(scheme);
    const styler = new styler_default();
    const renderer = new Renderer_default(tree, styler);
    return renderer.render();
  };

  // src/index.js
  (async () => {
    try {
      console.time("rendered");
      const pool = await render_default(manyDivs_default);
      console.log({ pool });
      console.timeEnd("rendered");
    } catch (err) {
      console.error(`Error on render ${err}`);
    }
  })();
})();
