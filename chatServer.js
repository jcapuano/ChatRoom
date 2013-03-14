/**
 * Created with JetBrains WebStorm.
 * User: jcapuano
 * Date: 3/8/13
 * Time: 3:07 PM
 * To change this template use File | Settings | File Templates.
 */
var socketio = require('socket.io');

var rooms = {};
var names = {};

function ChatServer(server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', function (socket) {
        socket.on('room', function(data) {

            if (!rooms.hasOwnProperty(data)) {
                rooms[data] = {users: []};
                io.sockets.emit('room', data);
            }
        });

        socket.on('message', function(data) {
            io.sockets.emit('message', data);
        })

        socket.on('name', function(data) {
            names[socket.id] = data.name;
            io.sockets.emit('name', data);
        })
    });

}

module.exports = {
    ChatServerObject: ChatServer,
    Rooms: rooms
};
