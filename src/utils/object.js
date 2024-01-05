
// Copied from https://github.com/metarhia/metautil: metautil/lib/object
export const isHashObject = (o) =>
  typeof o === 'object' && o !== null && !Array.isArray(o);