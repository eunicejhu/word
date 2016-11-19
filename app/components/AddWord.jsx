var React = require("react");
var $ = require("jquery");
var actions = require("../actions/WordActions");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			name: "",
			tagline: "",
			description: ""
		}
	},
	addWord: function(e) {
		
		e.preventDefault();
		
		actions.addWord(this.state);
		var $form = $(e.target);
		$form.find("#name").val('');
		$form.find("#description").val('');
		$form.find("#tagline").val('');
		console.log("state:", this.state);

		var state = this.state;
		state['name'] = $form.find("#name").val();
		state['description'] = $form.find("#description").val();
		state['tagline'] = $form.find("#tagline").val();
		this.setState(state);

	},
	handleInputChange: function(e) {
		e.preventDefault();
		var name = e.target.name;
		var state = this.state;
		state[name] = e.target.value;
		this.setState(state);
	},
	render: function() {
		return(
			<form className="form" onSubmit={this.addWord}>
				<div className="form-group">
					<label className="control-label" htmlFor="name">Word: </label>
					<input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Word"  />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="description">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleInputChange} placeholder="Description" />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="tagline">Tags:</label>
                    <input type="text" className="form-control" id="tagline" name="tagline" value={this.state.tagline} onChange={this.handleInputChange} placeholder="Tags: tag1,tag2" />
				</div>
				<div className="form-group">
					<button className="btn btn-info" type="submit">Add word</button>
				</div>
			</form>
		);
	}
});