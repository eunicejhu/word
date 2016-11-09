var React = require("react");
var WordInfo = require("./WordInfo.jsx");
var AddWord = require("./AddWord.jsx");

module.exports = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="col-md-6">
					<AddWord />
				</div>
				<div className="col-md-6">
				 	{
				 		this.props.words.map(function(s,index){
				 			return(
				 				<WordInfo info={s} key={"word"+index} />
				 			)
				 		})
				 	}
				</div>
			</div>
		)
	}
});