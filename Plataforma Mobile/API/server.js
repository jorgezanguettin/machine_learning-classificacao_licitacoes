const http = require("http");
const port = process.env.PORT || 8080
const app = require("./app");

const server = http.createServer(app);

server.listen(port, () => {
    console.log('API Ligada e rodando na porta : ' + port);
});