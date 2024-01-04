import scheme from './schemas/manyDivs.js'
import render from './dom/render.js'

(async () => {
  try {
    console.time('rendered');
    const pool = await render(scheme);
    console.log({ pool })
    console.timeEnd('rendered');
  } catch (err) {
    console.error(`Error on render ${err}`)
  }
})()
