import React from 'react';
import PicHolder from '../picholder/picholder.jsx';
import './autocomplete.css';

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
    }
	render() {
		return (
               <div ref={this.props.setRef} id="autocomplete" style={{top:this.props.top,position:'absolute'}}>
                    <input ref={this.props.inputRef} placeholder="Search Team" onKeyUp={this.props.onKeyHandler} type="search"/>
                    <div id="autocomplete-results">
                          {
                               this.props.searchResults.length > 0 ? 
                                    this.props.searchResults.map( (value, index) =>
                                            <div onClick={this.props.onResultClick} key={index} className="search-result clear">
                                                <PicHolder isAddTeam={false} />
                                                <div className="float-left result-text">{value.username}</div>
                                            </div>
                                    ) :
                                    <div id="autocomplete-empty">
                                        <div id="msg1">Team Member Not Found</div>
                                        <div id="msg2">Maybe she/he is not yet in your team?</div>
                                    </div>
                          }
                    </div>
                </div>
			   );
	 }
}