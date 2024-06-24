const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(process.env.DB_FILE || 'db.json'); // Lee la ruta desde la variable de entorno
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API
module.exports = server;
