import React from "react";
import ReactDOM from "react-dom";
import AddWord from "./AddWord.jsx";
import {word_actions} from "../../util/env_vars";

export default class EditWord extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			wordInEdit: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.isOpen) {
			$("#editWord").modal("hide");
		}
		this.setState({
			isOpen: nextProps.isOpen,
			wordInEdit: nextProps.wordInEdit
		});
	}

	render() {
		var bodyVisibility = {display: this.state.isOpen? "block" : "none"};
		return (
			<div style={bodyVisibility} id="editWord" className="modal fade" role="dialog">
				  <div className="modal-dialog">

				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Edit Word</h4>
				      </div>
				      <div className="modal-body">
				        	<AddWord actionType={word_actions.EDIT} word={this.state.wordInEdit}  />
				      </div>
				    </div>

				  </div>
			</div>
		);
	}
}