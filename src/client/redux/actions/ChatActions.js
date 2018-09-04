export function receiveMessage(messageData) {
	return {
		type: 'RECEIVE_MESSAGE',
		payload: messageData
	};
}

export function displayActiveUsers(users) {
	return {
		type: 'ACTIVE_USERS',
		payload: users
	}
}