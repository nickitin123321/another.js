import Tree from '../structs/Tree.js';
import Renderer from './Renderer.js';

export default async (scheme) => {
  const tree = new Tree(scheme);
  const renderer = new Renderer(tree);
  return await renderer.render();
};