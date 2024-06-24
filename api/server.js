const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Create the tmp directory if it doesn't exist (ensures persistence within a single test run)
const fs = require('fs');
if (!fs.existsSync(`${process.cwd()}/tmp`)) {
  fs.mkdirSync(`${process.cwd()}/tmp`);
}

// Use the FileSync adapter with the tmp directory path
const adapter = new jsonServer.lowdb.adapters.FileSync(`${process.cwd()}/tmp/db.json`);
const db = jsonServer.low(adapter);

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/product/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
