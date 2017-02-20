import React from "react";

export default class WordTag extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<span className="label label-info margin">{this.props.tag}</span>
		)
	}
}