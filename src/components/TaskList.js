import React, { Component } from 'react'
import TaskItem from './TaskItem'

class TaskList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			filterName: '',
			filterStatus: -1 // all: -1, hide: 1, enable: 0
		}
	}

	onChange = (event) => {
		let target = event.target
		let name = target.name
		let value = target.value
		this.props.onFilter(
			name === 'filterName' ? value : this.state.filterName,
			name === 'filterStatus' ? value : this.state.filterStatus
		)
		this.setState({
			[name] : value
		})
	}

	render() {
		let { tasks } = this.props
		let { filterName, filterStatus } = this.state
		let elmTasks = tasks.map((task, index) => {
			return 	<TaskItem
						key = {task.id}
						index = {index}
						task = {task}
						onUpdateStatus = { this.props.onUpdateStatus }
						onDelete = { this.props.onDelete }
						onEdit = { this.props.onEdit }
					/>
		})
		return (
			<table className="table table-bordered table-hover">
				<thead>
					<tr>
						<th className="text-center">No.</th>
						<th className="text-center">Name</th>
						<th className="text-center">Status</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							<input
								type="text"
								className="form-control"
								name="filterName"
								value= { filterName }
								onChange= { this.onChange }
							/>
						</td>
						<td>
							<select
								className="form-control"
								name="filterStatus"
								value= { filterStatus }
								onChange= { this.onChange }
							>
								<option value={-1}>All</option>
								<option value={0}>Hide</option>
								<option value={1}>Enable</option>
							</select>
						</td>
						<td></td>
					</tr>
					{ elmTasks }
				</tbody>
			</table>
		)
	}
}

export default TaskList