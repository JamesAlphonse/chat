let express = require('express');
let socket = require('socket.io');
let app = express();

server = app.listen(8080, function() {
	console.log('Server running.');
	console.log('---------------------------');
});

io = socket(server);

let users = [];

function logout(socket) {
	let userIndex = users.findIndex( function(x){ return x.socketID === socket.id });
	if( userIndex >= 0 ) {
		let userData = users[userIndex];
		users.splice(userIndex, 1);
		io.to(socket.id).emit('LOGOUT_CONFIRM', userData);
		AndromedaBotSays('User ' + userData.username + ' has left the chat!');
	}
	emitUsers();
}

function emitUsers() {
	io.emit('ACTIVE_USERS', users);
}

function AndromedaBotSays(message) {
	io.emit('RECEIVE_MESSAGE', {
		username: 'AndromedaBot',
		message: message
	});
}

io.on('connection', (socket => {
	console.log('USER CONNECTED');
	emitUsers();

	socket.on('disconnect', () => {
		logout(socket);
	});

	socket.on('LOGIN', username => {
		let newUser = {
			socketID: socket.id,
			username: username
		};
		users.push(newUser);
		io.to(socket.id).emit('LOGIN_CONFIRM', newUser);
		emitUsers();
		AndromedaBotSays('User ' + username + ' has joined the chat!');
	});

	socket.on('LOGOUT', () => {
		logout(socket);
	});

	socket.on('SEND_MESSAGE', message => {
		let userIndex = users.findIndex( function(x){ return x.socketID === socket.id });
		if( userIndex >= 0 ) {
			let userData = users[userIndex];
			let messageData = {
				username: userData.username,
				message: message
			}
			io.emit('RECEIVE_MESSAGE', messageData);
		}
	});
}));