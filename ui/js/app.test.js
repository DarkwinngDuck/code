'use strict';

app.namespace('app.test');

app.test = (function() {
  let post = app.ajax.postPut;

  function TestCtrlObj(className, url, type) {
    if (!(this instanceof TestCtrlObj)) {
      return new TestCtrlObj();
    }
    this.btn = document.getElementsByClassName(className)[0];
    this.url = url;
    this.type = type;
    this.btn.addEventListener('click', this.listener.bind(this), false);
  }

  TestCtrlObj.prototype.listener = function() {
    return post(this.type, this.url, null);
  };
  const start = new TestCtrlObj('start-test', '/api/start', 'POST');
  const stop = new TestCtrlObj('stop-test', '/api/stop', 'POST');

  return {
    stop: stop.type,
    start: start.type
  };
})();
