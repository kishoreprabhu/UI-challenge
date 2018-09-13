import React from 'react';

export default class MainLayout extends React.Component {
	render() {
		return ( <div className='app-container'>
					<main id="app-main-container">
						<div className="middle-block-wrapper">
							{this.props.children}
						</div>
					</main>
				 </div>);
	}
}