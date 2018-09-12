// modules
var mysql = require('mysql');
let express = require('express');
let socket = require('socket.io');
let app = express();
var sanitizer = require('sanitizer');

// start server
server = app.listen(8080, function() {
	console.log('Server running.');
	console.log('---------------------------');
});

// connect to database
// host: "142.93.200.128",
// production: socketPath: '/var/run/mysqld/mysqld.sock',
// dev: host: 'localhost',
var con = mysql.createConnection({
  user: "root",
  password: "cipher12",
  host: 'localhost',
  database: 'chat'
});

con.connect(function(error) {
  if (error)
  	throw error;

  console.log("Connected to Database!");
});

// start sockets
io = socket(server);

let users = [];
let historyNum = 50; // default

// get chat history
function getHistory(socket, num_messages) {
	let query = "SELECT "+
	"username, message, DATE_FORMAT(date_sent, '%W, %M %D, %Y') AS date_sent "+
	"FROM history "+
	"ORDER BY message_id DESC "+
	"LIMIT " + con.escape(num_messages) + ";";

	con.query(query, function (error, result) {
		if (error){
			throw error;
		}else{
			result.forEach(message => {
				message.username = message.username.replace(/\'/g, '');
				message.message = message.message.replace(/\'/g, '');
		    });
			io.to(socket.id).emit('HISTORY', result);
		}
	});
}

function insertHistory(data) {

	let query = 'INSERT INTO '+
	'history '+
	'(username, message, date_sent) '+
	'VALUES ("'+con.escape(data.username)+'", "'+con.escape(data.message)+'", NOW())';

	con.query(query, function(error, result) {
		if (error) {
			throw error;
		}
	})
}

function logout(socket) {
	let userIndex = users.findIndex( function(x){ return x.socketID === socket.id });
	if( userIndex >= 0 ) {
		let userData = users[userIndex];
		users.splice(userIndex, 1);
		io.to(socket.id).emit('LOGOUT_CONFIRM', userData);
		AndromedaBotSays('User ' + userData.username + ' has left the chat!');
		console.log('USER LOGGED OUT');
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

function AndromedaBotWhispers(socket, message){
	io.to(socket.id).emit('RECEIVE_MESSAGE', {
		username: 'AndromedaBot',
		message: message
	});
}

io.on('connection', (socket => {
	console.log('USER CONNECTED');
	emitUsers();
	getHistory(socket, historyNum);

	socket.on('disconnect', () => {
		console.log('USER DISCONNECTED');
		logout(socket);
	});

	socket.on('LOGIN', username => {
		console.log('USER LOGGIN: ' + username);
		username = sanitizer.sanitize(username);
		username = username.trim();
		username = username.replace(/\W/g, '');
		console.log(username);
		console.log(username.length);
		if(username != null && username.length >= 3 && username.length <= 30){
			let newUser = {
				socketID: socket.id,
				username: username
			};
			users.push(newUser);
			io.to(socket.id).emit('LOGIN_CONFIRM', newUser);
			emitUsers();
			AndromedaBotSays('User ' + username + ' has joined the chat!');
		}else{
			AndromedaBotWhispers(socket, "Please pick a valid username with at least 3 characters to login with. Valid characters include letters, numbers and underscores.");
		}
	});

	socket.on('LOGOUT', () => {
		logout(socket);
	});

	socket.on('SEND_MESSAGE', message => {
		console.log('USER MEESAGE: ' + message);
		message = sanitizer.sanitize(message);
		message = message.replace(/^\s+/g, '');
		message = message.replace(/\s+$/g, '');
		let userIndex = users.findIndex( function(x){ return x.socketID === socket.id });
		if( userIndex >= 0 && message != null && message.length >= 3 && message.length <= 200) {
			let userData = users[userIndex];
			let messageData = {
				username: userData.username,
				message: message
			}
			insertHistory(messageData);
			io.emit('RECEIVE_MESSAGE', messageData);
		}else{
			AndromedaBotWhispers(socket, "Please enter a valid message containing at least 3 characters.")
		}
	});
}));