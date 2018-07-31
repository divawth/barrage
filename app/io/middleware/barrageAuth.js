'use strict';

const PREFIX = 'room';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx;
    const id = socket.id;
    const barrageIO = app.io.of('/barrage');
    const query = socket.handshake.query;

    const { room, userId } = query;
    const rooms = [ room ];
    const hasRoom = await app.redis.get(`${PREFIX}:${room}`);

    const tick = (id, msg) => {
      socket.emit(id, helper.parseMsg('deny', msg));
      barrageIO.adapter.remoteDisconnect(id, true, err => {
        logger.error(err);
      });
    };
    if (!hasRoom) {
      tick(id, {
        type: 'deleted',
        message: 'deleted, room has been deleted.',
      });
      return;
    }

    socket.join(room);

    barrageIO.adapter.clients(rooms, (err, clients) => {
      barrageIO.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `User(${id}) joined.`,
      });
    });
    await next();

    barrageIO.adapter.clients(rooms, (err, clients) => {
      barrageIO.to(room).emit('online', {
        clients,
        action: 'leave',
        target: 'participator',
        message: `User(${id}) leaved.`,
      });
    });

  };
};
