const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 19205 });

wss.on('connection', socket => {
    socket.on('message', message => {
        console.log(`Received message => ${message}`);
        socket.send(`Received message => ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
})

console.log('WebSocket server is running on port: ', wss.options.port);