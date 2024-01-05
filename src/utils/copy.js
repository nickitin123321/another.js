import { isHashObject } from './object.js';
import { toUpperCamel } from './strings.js'

export const dirtyShallowCopy = (obj) => JSON.parse(JSON.stringify(obj))

// Copied from https://github.com/metarhia/metautil: metautil/lib/object
export const flatObject = (source, fields = []) => {
  const target = {};
  for (const [key, value] of Object.entries(source)) {
    if (!isHashObject(value)) {
      target[key] = value;
      continue;
    }
    if (fields.length > 0 && !fields.includes(key)) {
      target[key] = { ...value };
      continue;
    }
    for (const [childKey, childValue] of Object.entries(value)) {
      const combined = `${key}${toUpperCamel(childKey)}`;
      if (source[combined] !== undefined) {
        const error = `Can not combine keys: key "${combined}" already exists`;
        throw new Error(error);
      }
      target[combined] = childValue;
    }
  }
  return target;
};

// Copied from https://github.com/metarhia/metautil: metautil/lib/object
export const unflatObject = (source, fields) => {
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    const prefix = fields.find((name) => key.startsWith(name));
    if (prefix) {
      if (Object.prototype.hasOwnProperty.call(source, prefix)) {
        throw new Error(`Can not combine keys: key "${prefix}" already exists`);
      }
      const newKey = key.substring(prefix.length).toLowerCase();
      const section = result[prefix];
      if (section) section[newKey] = value;
      else result[prefix] = { [newKey]: value };
      continue;
    }
    result[key] = value;
  }
  return result;
};