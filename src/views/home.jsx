import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './component/spinner/spinner.jsx';
import PicHolder from './component/picholder/picholder.jsx';
import AutoComplete from './component/autocomplete/autocomplete';
import '../css/teampage.css';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	       isLoading: false,
		   searchTop: 0,
		   isAutoComplete: false,
		   teamList : [],
		   filteredTeamList : [],
		   selectedTeam: null,
		   addedMembers : [],
		   renderShowAll: false,
		   showAllMembers : false 
	   }
	}
	componentDidMount() {
		fetch("./src/data/data.json")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					 teamList: result
				});
			},
			(error) => {
				console.log(error, "error in ajax call")
			}
		)
	}
	addTeam( event ) {
		var target = event.currentTarget;
		var position = target.getBoundingClientRect();
		
		this.setState({
			searchTop: position.top,
			isAutoComplete: true
		});
	}
	collapse( event ) {
		const area = ReactDOM.findDOMNode(this.childRef);
		if (area && !area.contains(event.target)) {
			this.setState({
				isAutoComplete: false
			})
		}
	}
	setRef(input) {
        this.childRef = input;
    }
	inputRef(input) {
        this.searchRef = input;
		if ( this.searchRef ) {
			this.searchRef.focus();
		}
    }
	addTeamMemberIntoTeam( teamMember ) {
		if ( teamMember ) {
			teamMember = teamMember.toLowerCase();
			var filteredData = this.state.teamList.filter( (value, index) => {
										return value.username.toLowerCase().indexOf(teamMember) > -1;
								});
			if ( filteredData.length > 0 ) {
				this.setState(prevState =>({
					addedMembers: prevState.addedMembers.concat(filteredData),
					isAutoComplete: false,
					renderShowAll: this.state.addedMembers.length >= 5 ? true : false
				}));
			}
		}
		
	}
	renderAllMember() {
		this.setState({
			renderShowAll: false,
			showAllMembers: true
		});
	}
	onKeyHandler( event ) {
		var searchText = event.target.value;
		if ( event.keyCode === 13 ) {
			this.addTeamMemberIntoTeam( searchText );
		} else {
			searchText = searchText.toLowerCase();
			if ( searchText ) {
				var filteredData = this.state.teamList.filter( (value, index) => {
										return value.username.toLowerCase().indexOf(searchText) > -1;
								});
				this.setState({
					filteredTeamList : filteredData
				});
			} else {
				this.setState({
					filteredTeamList : []
				});
			}
		}
	
	}
	onTeamSelect( event ) {
		var target = event.currentTarget;
		var selectedTeam = target.getElementsByClassName("result-text")[0].textContent;
		if ( selectedTeam ) {
			this.searchRef.value = selectedTeam;
			if (this.searchRef) this.searchRef.focus();
			this.setState({
				filteredTeamList: []
			})
		}
	}
	render() {
		   var top = this.state.searchTop;
	       var members = this.state.addedMembers.length <= 5 || this.state.showAllMembers ? 
		   				 this.state.addedMembers : this.state.addedMembers.slice(0, 5)
			return (
			         <div className="home-page">
						 	<div className="content-area">

									<div id="team_container" onClick={ this.collapse.bind(this) }>
										<div id="header_block" className="clear">
											<div className="float-left">your team for this test</div>
											<div id="team-text" className="float-right margin-right-ten">team page</div>
										</div>
										<div id="team_list_wrap" className="clear">
											<div className="float-left clear team_tile_wrap" onClick={this.addTeam.bind(this)}>
												<PicHolder isAddTeam={true} />
												<div id="add-team-text" className=" float-left padding-left-10">Add team member to test</div>
											</div>
                                            {
												members.map( (value, index) =>
													<div key={index} className="team_tile_wrap float-left clear">
														<PicHolder isAddTeam={false} />
														<div className="float-left padding-left-10">
															<div className="user-role">{value.role}</div>
															<div className="user-type">{value.username}</div>
														</div>
													</div>
												)
											}
											
										</div>
									</div>

									{
										this.state.isAutoComplete ? 
										<AutoComplete 
											onResultClick = {this.onTeamSelect.bind(this) }
											searchResults = {this.state.filteredTeamList} 
											onKeyHandler={this.onKeyHandler.bind(this)} 
											setRef={this.setRef.bind(this)} 
											inputRef = { this.inputRef.bind(this) }
											top={top} 
										/> : null
									}
									{
										this.state.renderShowAll ? 
											<div id="show-all" onClick={this.renderAllMember.bind(this)}> Show All <i className="down"></i> </div> :
											null
									}
						 	</div>
					 </div>	
				  );
	}
}