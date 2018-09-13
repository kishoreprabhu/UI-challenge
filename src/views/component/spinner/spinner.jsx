import React from 'react';
import './spinner.css';

export default class Spinner extends React.Component {
	 render() {
		return (
				<div id="page_spinner">
					<div className="spinner"></div>
					<div className="spinner_text">LOADING</div>
				</div>
			    );
	 }
}