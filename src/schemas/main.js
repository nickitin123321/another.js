export default {
  tag: 'div',
  parent: document.body,
  style: { 'background-color': 'navy', width: '90px', height: '100px' },
  chs: [
    {
      tag: 'div', chs: [
        { tag: 'div', chs: [] },
      ]
    },
    {
      tag: 'div', chs: [],
    },
    {
      tag: 'div', chs: [],
      style: { 'background-color': 'gray', width: '90px', height: '100px' },
    },
    { tag: 'div', chs: [] },
    {
      tag: 'div', chs: [],
      style: { 'background-color': 'green', width: '90px', height: '100px' },
    },
    {
      tag: 'div', chs: [
        {
          tag: 'div', chs: [],
          style: { 'background-color': 'black', width: '40px', height: '100px' },
        },
      ]
    },
  ]
};