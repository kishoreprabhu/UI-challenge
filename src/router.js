import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from './views/mainlayout.jsx'
import Home from './views/home.jsx';


export default ( 
		<Router  history={browserHistory}>
					<Route component={MainLayout} >
						<Route path="/" component={Home} />
					</Route>
		</Router>
);


