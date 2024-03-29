/* eslint-disable no-console */
import { createServer } from 'http';

import stoppable from 'stoppable';

import app from './app';

import normalizePort from './utils/normalize-port';

import gracefulShutdown from './utils/graceful-shutdown';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '1574');

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

import loadGateways from './loaders/gateways';

loadGateways(server);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);

// quit on ctrl+c when running docker in terminal
process.on('SIGINT', async () => {
  console.info('Got SIGINT (aka ctrl+c in docker). Graceful shutdown', new Date().toISOString());
  await gracefulShutdown(stoppable(server));
});

// quit properly on docker stop
process.on('SIGTERM', async () => {
  console.log('Got SIGTERM (docker container stop).Graceful shutdown', new Date().toISOString());
  await gracefulShutdown(stoppable(server));
});

export default server;
