'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.get('/barrage', controller.barrage.index);

  // socket.io
  io.of('/barrage').route(
    'server',
    io.controller.barrage.server
  );
};
