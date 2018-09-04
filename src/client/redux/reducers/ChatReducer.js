// reducer for chat room operations
const init = {
	log: [
		{
			username: 'AndromedaBot',
			message: 'Welcome to my chat app! Please be kind to each other and have fun.'
		}
	],
	users: []
};

const chatRoomReducer = (state = init, action) => {
	switch (action.type) {
		case 'SEND':
			return {
				...state,
				log: [
					...state.log,
					action.payload
				]
			}
		case 'RECEIVE_MESSAGE':
			return {
				...state,
				log: [
					...state.log,
					action.payload
				]
			}
		case 'ACTIVE_USERS':
		return {
			...state,
			users: [
				...action.payload
			]
		}
		default:
			return state;
	}
};

export default chatRoomReducer;