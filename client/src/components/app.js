import { h } from 'preact';
// import { Router } from 'preact-router';
import Footer from './footer';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from '../routes/home';
import Snippet from '../routes/snippet'

const App = () => (
	<div id="app">
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Home} key={Math.random().toString(36).substring(7)} />
				<Route path='/:id' exact component={Snippet} />
			</Switch>
			<Footer />
		</BrowserRouter>
		
	</div>
)

export default App;
