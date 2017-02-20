import React from "react";
// import $ from "jquery";
import * as daterangepicker from "bootstrap-daterangepicker";

export default class LeftSideBar extends React.Component{
	constructor() {
		super();
		this.state = {
			dateBegin: null,
			dateEng: null
		}
	}

	componentDidMount() {
		console.log($);
		// daterangepicker.call($(this.refs.dateRangePicker))
	}

	render() {
		return (
			<div className="col-sm-12 col-md-3 col-lg-3">
				<div>
				  <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
				    hello this is sidebar
				  </a>
				</div>
				<div className="collapse" id="collapseExample">
				  <div className="card card-block">
				    	<input name="dateRangePicker" ref="dateRangePicker" />
				  </div>
				</div>
			</div>
		);
	}
}

