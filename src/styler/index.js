import { gen } from '../utils/uuid'

export default class {
  //`.${uuid} ${JSON.stringify(item.style)}`.replaceAll(',', ';').replaceAll('"', '')
  parseParams(uuid, style){
    let stringChunk = `\n .${uuid} {`;
    for (const [key, value] of Object.entries(style)){
      stringChunk += `\n\ \ ${key}: ${value};`
    }

    return `${stringChunk} \n } \n`;
  }

  async linkPool(pool) {
    let cssString = ''
    for (const item of pool) {
      if (!item.style) continue;
      const uuid = gen();
      item.content.className = uuid;
      cssString += this.parseParams(uuid, item.style);
    }

    return cssString;
  }
}