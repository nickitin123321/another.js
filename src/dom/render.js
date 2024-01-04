import Tree from '../structs/Tree.js';
import Renderer from './Renderer.js';
import Styler from '../styler/index.js'

export default async (scheme) => {
  const tree = new Tree(scheme);
  const styler = new Styler();
  const renderer = new Renderer(tree, styler);

  return renderer.render();
};