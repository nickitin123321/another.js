export default class {
  pool = [];
  eventTypes = [];
  constructor(pool) {
    this.pool = pool;
    this.eventTypes = this.getAllEventsTypes();
  }

  getAllEventsTypes() {
    const types = [];

    for (const event in window) {
      if (/^on/.test(event)) types[types.length] = event;
    }

    return types;
  }

  initHandlers(){
    for (const { content } of this.pool) {
      for (const key in content) {
        if event
      } 
    }
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