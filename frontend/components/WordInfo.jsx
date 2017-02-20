import React from "react";
import {deleteWord as deleteWordAction} from "../actions/WordActions";
import WordTag from "./WordTag.jsx";
import _ from "underscore";

export default class WordInfo extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			word: props.word
		}

		this.deleteWord = this.deleteWord.bind(this);
		this.editWord = this.editWord.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			word: nextProps.word
		});
	}

	deleteWord() {
		deleteWordAction(this.state.word);
	}

	editWord() {
		this.props.handleIsEditChange(this.state.word._id);
	}

	eachTag(tag, i) {
		return (
			<WordTag tag={tag} key={i} />
		)
	}

	render() {
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
				 	{this.state.word.name}
				 	<span>
				 		{
					 		this.state.word.tagline.map(this.eachTag)
					 	}
				 	</span>
				 	<span className="pull-right leftset1 cursor text-uppercase delete-button glyphicon glyphicon-remove" 
				 		onClick={this.deleteWord} >
			 		</span>
				 	<span className="pull-right text-uppercase cursor edit-button glyphicon glyphicon-edit" 
			 			data-toggle="modal" 
			 			data-target="#editWord" 
				 		onClick={this.editWord} >
			 		</span>
				 	
				</div>
				<div className="panel-body">
					{this.state.word.description}
				</div>
			</div>
		)
	}
}