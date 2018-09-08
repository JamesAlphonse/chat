//SELECT * FROM history ORDER BY message_id DESC LIMIT 50 OFFSET 50;

// reducer for chat room operations
const init = {
	historyMax: 50,
	log: [],
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
			let newState = {
				...state,
				log: [
					...state.log,
					action.payload
				]
			};

			if(newState.historyMax < newState.log.length)
				newState.log.shift();

			return newState;
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