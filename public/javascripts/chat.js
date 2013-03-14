function Chat(emitter){
    var self = this;
    this.emitter = emitter;
    this.socket = io.connect('http://localhost:3000');

    this.socket.on('room', function(data) {
        var room = data.room;
        console.log('received room from server: ' + room);
        self.emitter.emitEvent('room', [data.room]);

    });

    this.socket.on('name', function(data) {
        var name = data.name;
        console.log('received name from server: ' + name);
        self.emitter.emitEvent('name', [name]);

    });

};
Chat.prototype.processCommand = function(inputtext) {
    var command = inputtext.slice(inputtext.indexOf("/")+1, inputtext.indexOf(" "));
    var message = inputtext.slice(inputtext.indexOf(" ") + 1, inputtext.length);
    //alert("Command="+command+"  Message="+message);
    if (command == 'join') {
        this.joinRoom(message);
    }
    else if (command == 'nick') {
        this.changeName(message);
    }
    else {
        this.sendMessage(inputtext);
    }
};
Chat.prototype.sendMessage = function(message){
    this.socket.emit('message',{
        'message' : message
    });
};
Chat.prototype.joinRoom = function(roomName){
    //this.emitter.emitEvent('room', [roomName]);
    this.socket.emit('room',{
        "room": roomName
    });
};
Chat.prototype.changeName = function(name){
    this.socket.emit('name',{
        "name": name
    });
};

