var React = require("react");
var dateRangePicker = require("bootstrap-daterangepicker");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="col-sm-12 col-md-3 col-lg-3">
				<div>
				  <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
				    hello this is sidebar
				  </a>
				</div>
				<div className="collapse" id="collapseExample">
				  <div className="card card-block">
				    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
				  </div>
				</div>
			</div>
		);
	}
});