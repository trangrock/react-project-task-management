import React, { Component } from 'react'

class Sort extends Component {

	onClick = (sortBy, sortValue) => {
		this.props.onSort(sortBy, sortValue)
	}

	render() {
		let { sortBy, sortValue } = this.props
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<div className="dropdown">
					<button
						type="button"
						className="btn btn-primary dropdown-toggle"
						id="dropdownMenu1"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="true"
					>
						Sort
						&nbsp;
						<span className="fa fa-caret-square-o-down ml-5"></span>
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
						<li onClick={ () => this.onClick('name', 1) }>
							<a
								role="button"
								className={ (sortBy === 'name' && sortValue === 1) ? "sort_selected" : '' }
							>
								<span className="fa fa-sort-alpha-asc pr-5">
									Name A-Z
								</span>
							</a>
						</li>
						<li onClick={ () => this.onClick('name', -1) }>
							<a
								role="button"
								className={ (sortBy === 'name' && sortValue === -1) ? "sort_selected" : '' }
							>
								<span className="fa fa-sort-alpha-desc pr-5">
									Name Z-A
								</span>
							</a>
						</li>
						<li role="separator" className="divider"></li>
						<li onClick={ () => this.onClick('status', 1) }>
							<a
								role="button"
								className={ (sortBy === 'status' && sortValue === 1) ? "sort_selected" : '' }
							>
								Enable Status
							</a>
						</li>
						<li onClick={ () => this.onClick('status', -1) }>
							<a
								role="button"
								className={ (sortBy === 'status' && sortValue === -1) ? "sort_selected" : ''}
							>
								Hide Status
							</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Sort