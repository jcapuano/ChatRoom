$(document).ready(function() {
    var emitter = new EventEmitter();

    this.socket = io.connect('http://localhost:3000');
    this.socket.on('room', function(data) {
       console.log('room');
    });

    var chat = new Chat(emitter);
    $("#send-button").on("click", function(e){
           chat.processCommand($("#send-message").val());
           return false;
        }
    );

    emitter.addListener('room', function(room) {
       console.log(room + ' added');
       // add it to a list
       $('#room-list')
           .append($('<li>' + room + '</li>'));
    });

    emitter.addListener('name', function(name) {
        console.log(name + ' added');
        // add it to a list
        $('#messages')
            .append($('<p>' + name + '</p>'));
    });

});
