var React = require("react");

module.exports = React.createClass({
	handleSort: function(e) {
		this.props.onReOrder(e.target.id, this.props.orderDir);
	},
	handleOrder: function(e) {
		this.props.onReOrder(this.props.orderBy, e.target.id);
	},
	handleSearch: function(e) {
		this.props.onSearch(e.target.value);
	},
	render: function() {
		return (
			<div className="row search-words">
				<div className="col-sm-12 col-md-12 col-lg-12">
					<div className="input-group">
						<input id="SearchWords" onChange={this.handleSearch} placeholder="Search" type="text" className="form-control" aria-label="Search Words" />
						<div className="input-group-btn">
							<button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
								Sort by: <span className="caret"></span>
							</button>
							<ul className="dropdown-menu dropdown-menu-right">
								<li><a href="#" id="name" onClick={this.handleSort}>Name { (this.props.orderBy === 'name') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
								<li><a href="#" id="createdOn" onClick={this.handleSort}>Date { (this.props.orderBy === 'createdOn') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
								<li role="separator" className="divider"></li>
								<li><a href="#" id="asc" onClick={this.handleOrder}>Asc { (this.props.orderDir === 'asc') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
								<li><a href="#" id="dsc" onClick={this.handleOrder}>Dsc { (this.props.orderDir === 'dsc') ? <span className="glyphicon glyphicon-ok"></span> : null}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
});