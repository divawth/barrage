'use strict';

const Controller = require('egg').Controller;

class BarrageController extends Controller {
  async server() {
    const { ctx, app } = this;
    const barrage = app.io.of('/barrage');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseMsg('server', payload, { client, target });
      console.log('target>>>>>>>>>>>>>>>>>>', target)
      barrage.emit(target, msg);
    } catch (error) {
      console.log('error>>>>>>>>>>>>>>>>>>', error)
      app.logger.error(error);
    }
  }
}

module.exports = BarrageController;
