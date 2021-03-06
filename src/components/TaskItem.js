import React, { Component } from 'react'

class TaskItem extends Component {

	onUpdateStatus = () => {
		this.props.onUpdateStatus(this.props.task.id)
	}

	onDelete = () => {
		this.props.onDelete(this.props.task.id)
	}

	onEdit = () => {
		this.props.onEdit(this.props.task.id)
	}

	render() {
		let { task, index } = this.props
		return (
			<tr>
				<td> { index + 1 } </td>
				<td style={{fontWeight: "bold"}}> { task.name } </td>
				<td className="text-center">
					<span
						className={ !!task.status ? "label label-danger" : "label label-success"}
						onClick= { this.onUpdateStatus }
					>
						{ !!task.status ? "Enable" : "Hide"}
					</span>
				</td>
				<td className="text-center">
					<button
						type="button"
						className="btn btn-warning"
						onClick= { this.onEdit }
					>
						<span className="fa fa-pencil mr-5"></span>
						Edit
					</button>
					&nbsp;
					<button
						type="button"
						className="btn btn-danger"
						onClick= { this.onDelete }
					>
						<span className="fa fa-trash mr-5"></span>
						Delete
					</button>
				</td>
			</tr>
		)
	}
}

export default TaskItem