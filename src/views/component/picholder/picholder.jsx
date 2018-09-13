import React from 'react';
import './picholder.css';

export default class PicHolder extends React.Component {
    constructor(props) {
        super(props);
    }
	 render() {
		return (
                <div className="clear float-left"> 
                    {
                       this.props.isAddTeam ? 
                       <div className="float-left team_oval add_team"></div> :
                       <div className="float-left user-pic team_oval"></div>
                    }
                </div>
			   );
	 }
}