const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');
// const app = require('./app');

// app.listen(PORT, () =>
//   console.log(`App is running on http://localhost:${PORT}`)
// );

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// Declare a route
fastify.register(require('./app'));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
