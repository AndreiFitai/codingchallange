const express = require('express');
const http = require('http');
const { logger, getEnv } = require('./helpers');
const flights = require('./flights');
const { initialCache } = require('./cache');

const app = express();
const router = express.Router();

const port = getEnv('PORT') || '3000';

app.use(router);

const server = http.createServer(app);

server.listen({ port }, () => {
  logger.info(`🚀 Server ready at http://localhost:${port}`);
  initialCache();
});

router.get('/', async (req, res) => {
  console.time('query time: ');

  const flightsData = await flights();
  res.send(flightsData);

  console.timeEnd('query time: ');
});
