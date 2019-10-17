import {h, Component, createRef} from 'preact';
import AutoSuggest from './AutoSuggest';

export default class AutoSuggestTrains extends Component {  
	constructor() {
		super();
		this.state = {
			suggestions: [],
			value: ''
		};
		this.autoSuggestRef = createRef();
		this.onNewSearchQuery = this.onNewSearchQuery.bind(this);
		this.listItemMarkup = this.listItemMarkup.bind(this);
		this.suggestionClicked = this.suggestionClicked.bind(this);
	}

	onNewSearchQuery(val) {
		const {suggestions} = this.state;
		 if (suggestions.length !== 0 && this.oldVal === val) {
      return null;
		}
		fetch(`https://voyager.goibibo.com/api/v2/trains_search/find_node_by_name/?search_query=${val}&limit=10&flavour=ios&vertical=GoRail`).then((resp) => {
			return resp.json();
		}).then((resp) => {
			this.setState({
				suggestions: resp.data.r || []
			});
		});
		this.oldVal = val;
	}

	// List item Markup Renderer
  listItemMarkup(suggestion) {
		return (
			<span class="textOverflow" title={suggestion.dn + ',' + suggestion.irctc_code}>
				<span>{suggestion.dn + ','}</span>
				<span class="fb">{suggestion.irctc_code}</span>
			</span>
		);
	}

  suggestionClicked(event, suggestion, index) {
		this.autoSuggestRef.current.updateInputBox(suggestion.dn  + ',' + suggestion.irctc_code);
		this.setState({
			suggestions: []
		});
		this.props.onSelection(suggestion, this.props.isSrc);
  }

  render() {
    const { suggestions} = this.state;
		const {placeholder} = this.props;
    return (
      <AutoSuggest ref={this.autoSuggestRef} callback={this.onNewSearchQuery} updateInputBox={this.updateInputBox} suggestions={suggestions} listItemMarkup={this.listItemMarkup} suggestionClicked={this.suggestionClicked} placeholder={placeholder}/>
    );
  }
}