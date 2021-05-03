import React, { Component } from 'react';

class Like extends Component {
	render() {
		let classes = 'fa fa-heart';
		if (!this.props.liked) classes += '-o';
		return <i style={{ cursor: 'pointer' }} onClick={this.props.onClick} className={classes}></i>;
	}
}

export default Like;
