const { EventEmitter } = require('events');

class Emitter extends EventEmitter {}

module.exports = {
  userEmitter: new Emitter(),
};
