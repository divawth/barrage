'use strict';

module.exports = {
  parseMsg(action, data = {}) {
    console.log(action, '>>>>>>>>>>')
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, data);

    return {
      message_type: action,
      data: meta
    };
  },
};
