// reducer for chat room operations
const init = {
	isLoggedIn: false,
	socketID: null,
	username: null,
};

const UserReducer = (state = init, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isLoggedIn: true,
				socketID: action.payload.socketID,
				username: action.payload.username,
			}
		case 'LOGOUT':
			return {
				...state,
				isLoggedIn: false,
				username: null,
				socketID: null,
			}
		default:
			return state;
	}
};

export default UserReducer;