import main from './schemas/main.js'
import render from './dom/render.js'

(async () => {
  try {
    await render(main);
  } catch (err) {
    console.error(`On render error: ${err}`);
  }
})()
