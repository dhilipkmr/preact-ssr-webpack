import { h, Component } from 'preact';
import Home from './Container/Home'

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Home path="/" />
			</div>
		);
	}
}