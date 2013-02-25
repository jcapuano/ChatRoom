function Chat(){
    this.socket = io.connect('http://localhost:3000');
};
Chat.prototype.processCommand = function(inputtext) {
    var command = inputtext.slice(inputtext.indexOf("/")+1, inputtext.indexOf(" "));
    var message = inputtext.slice(inputtext.indexOf(" ") + 1, inputtext.length);
    alert("Command="+command+"  Message="+message);
};
Chat.prototype.sendMessage = function(message){
    socket.emit('message',{'message' : ?});
};
Chat.prototype.joinRoom = function(roomName){
    socket.emit('room',{});
};
Chat.prototype.changeName = function(name){
    socket.emit('name',{});
};

