const COL_COUNT = 6;
const DIV_SIZE = 230;
const INNER_GAP = 40;

export default {
  tag: 'div',
  parent: document.body,
  style: {
    display: 'grid',
    'grid-template-columns': `repeat(${COL_COUNT}, ${DIV_SIZE}px)`
  },
  chs: [
    {
      style: {
        width: `${DIV_SIZE}px`,
        height: `${DIV_SIZE}px`,
        'background-color': 'navy',
        border: '1px solid white',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      },
      tag: 'div',
      x: 80000,
      chs: [
        {
          tag: 'div',
          style: {
            display: 'flex',
            width: `${DIV_SIZE - INNER_GAP}px`,
            height: `${DIV_SIZE - INNER_GAP}px`, 'background-color': 'yellow',
          },
        }
      ]
    }
  ]
};