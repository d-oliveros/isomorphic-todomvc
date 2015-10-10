import http from 'http';
import './database/mongo';

const emptyFunction = function(){};

/**
 * HTTP server.
 * @extends {http.Server}
 */
export default class Server extends http.Server {
  constructor(app) {
    super(app);
    this.started = false;
  }

  /**
   * Starts cron, the websockets server, and the app.
   *
   * @param {String|Number}  port      The port to listen on.
   * @param {Function}       callback  Callback function.
   */
  bootstrap(port, callback=emptyFunction) {
    if (this.started) return callback(new Error('Server has already started'));

    // Do other boot-time logic

    this.started = true;
    this.listen(port, callback);
  }
}
