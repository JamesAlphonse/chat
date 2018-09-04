// react
import React from 'react';
import ReactDOM from 'react-dom';

// service worker
import registerServiceWorker from './registerServiceWorker';

// redux
import { Provider } from 'react-redux';
import store from './client/redux/store';

// App
import App from './client/App';

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
