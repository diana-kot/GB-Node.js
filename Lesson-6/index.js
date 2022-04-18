const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

const discon = (client) => {
    io.emit('disconnected-msg',
        {
            message: ' has disconnected',
            user: client
        })
}
io.on('connection', (client) => {

    let clientName = '';
    client.on('new-cli', (data) => {
        clientName = data

        client.broadcast.emit('NEW_CONN_EVENT',
            {
                msg: ' has connected',
                name: clientName
            });
    })

    client.on('client-msg', (data) => {
        //  console.log(data);
        const serverData = {
            message: data.message.split('').reverse().join(''),
            user: data.user,
        };

        client.broadcast.emit('server-msg', serverData);
        client.emit('server-msg', serverData);
    });

    client.on('disconnect', () => {
        console.log('user disconnect', clientName);

        discon(clientName);
    })
});

server.listen(5555);