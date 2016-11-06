const http = require('http');

const hostname = 'otatsumi-owncloud';
const port = 8090;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const Pid = process.pid;
var fs = require("fs");
fs.writeFileSync("/tmp/nodejsServer.PID", Pid, "UTF-8");

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
