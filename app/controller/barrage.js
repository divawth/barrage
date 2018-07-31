'use strict';

const Controller = require('egg').Controller;

class BarrageController extends Controller {
  async index() {
    await this.ctx.render('barrage');
  }
}

module.exports = BarrageController;
