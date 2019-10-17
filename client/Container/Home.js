import { h, Component, fragment } from 'preact';
import AutoSuggestTrains from '../Component/AutoSuggestTrains';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			showError: false,
			source: {},
			destination: {},
			date: ''
		};
		this.changeDate = this.changeDate.bind(this);
		this.beginSearch = this.beginSearch.bind(this);
		this.onSelection = this.onSelection.bind(this);
	}
	
	changeDate(e) {
		this.setState({
			date: e.target.value
		});
	}

	beginSearch() {
		const { source, destination, date } = this.state;
		if (!source || !destination || !date) {
			return;
		}
		window.open(`https://www.goibibo.com/trains/results?src=${source.irctc_code}&dst=${destination.irctc_code}&date=${date.split('-').join('')}&class=ALL&srcname=${source.dn}&dstname=${destination.dn}`);
	}

	onSelection(suggestion, isSrc) {
		const val = isSrc ? 'source' : 'destination';
		this.setState({
			[val]: suggestion
		});
	}

	render() {
		const { showError, date } = this.state;
		return (
			<fragment>
				<div class="blueBanner pad25">
					<AutoSuggestTrains placeholder="Source" onSelection={this.onSelection} isSrc />
					<AutoSuggestTrains placeholder="Destination" onSelection={this.onSelection} />
					<input class="dateInput" type="date" value={date} onChange={this.changeDate} />
					<button class="search" onClick={this.beginSearch}>Search</button>
					{
						showError ?
							<div class="error">Fill in the Details</div> :
							null
					}
				</div>
			</fragment>
		);
	}
}