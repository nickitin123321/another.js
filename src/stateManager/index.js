export default class {
  pool = [];
  constructor(pool) {
    this.pool;
  }

  getAllEventsTypes() {
    const types = [];

    for (const event in window) {
      if (/^on/.test(event)) types[types.length] = event;
    }

    return types
  }


  //   globalListen(){
  //     Object.keys(window).forEach(key => {
  //       if (/^on/.test(key)) {
  //           window.addEventListener(key.slice(2), event => {
  //               console.log(event);
  //           });
  //       }
  //   });
  //   }
}