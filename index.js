const io = require("socket.io")(8000)

io.on('connection', socket => {
    const users = {};

    socket.on('new-user-joined', name => {
        // console.log(name, "has joined");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        console.log(users);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
    });
});