var React = require("react");
var ReactDOM = require("react-dom");
var AddWord = require("./AddWord.jsx");
var ENV_VARS = require("../../util/env_vars");


module.exports = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false,
			wordInEdit: {}
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if(!nextProps.isOpen) {
			$("#editWord").modal("hide");
		}
		this.setState({
			isOpen: nextProps.isOpen,
			wordInEdit: nextProps.wordInEdit
		});
	},
	render: function() {
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
				        	<AddWord actionType={ENV_VARS.HANDLE_WORD_EDIT} word={this.state.wordInEdit}  />
				      </div>
				    </div>

				  </div>
			</div>
		);
	}
});