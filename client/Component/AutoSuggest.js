import {h, Component, createRef} from 'preact';

export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: ''
    }
    this.inputRef = createRef();
    this.updateInputBox = this.updateInputBox.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 
  updateInputBox(val) {
    this.setState({
      val
    });
  }

  onChange(e) {
    this.setState({
      val: e.target.value
    },() => {
      this.props.callback(this.state.val);
    })
  }

  render() {
    const {suggestions = [], callback, suggestionClicked, listItemMarkup, value, placeholder} = this.props;
    return (
      <div class="autoSuggest">
        <input class="autoSuggestInput" value={this.state.val} ref={this.inputRef} onKeyup={this.onChange} placeholder={placeholder}/>
        {suggestions.length > 0 ?
          <div class="posRel">
            <ul class="suggestWrap posAbs">
              {
                suggestions.map((suggestion, index) => {
                  return (
                    <li class="suggestItem curPoint" onClick={(e) => {suggestionClicked(e, suggestion, index)}}>
                      {listItemMarkup(suggestion)}
                    </li>
                  )
                })
              }
            </ul>
          </div> :
          null
        }
      </div>
    );
  }
}