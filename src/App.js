import React, { Component } from 'react'
import shortid from 'shortid'
import _ from 'lodash'
import './App.css'
import TaskForm from './components/TaskForm'
import SearchSort from './components/SearchSort'
import TaskList from './components/TaskList'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: [],
			isDisplayForm: false,
			taskEditing: null,
			filter: {
				name: '',
				status: -1
			},
			keyword: '',
			sortBy: 'name',
			sortValue: 1
		}
	}

	componentDidMount() {
		if(localStorage && localStorage.getItem('tasks')) {
			let tasks = JSON.parse(localStorage.getItem('tasks'))
			this.setState({
				tasks: tasks
			})
		}
	}

	onToggleForm = () => {
		if(!!this.state.isDisplayForm && this.state.taskEditing !== null) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null
			})
		} else {
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
				taskEditing: null
			})
		}
	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false
		})
	}

	onOpenForm = () => {
		this.setState({
			isDisplayForm: true
		})
	}

	onSubmit = (data) => {
		let { tasks } = this.state
		if (data.id === '') {
			data.id = shortid.generate()
			tasks.push(data)
		} else {
			// Editing
			let index = this.findIndex(data.id)
			tasks[index] = data
		}
		this.setState({
			tasks: tasks,
			taskEditing: null // Set edit task back to ask task
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	onUpdateStatus = (id) => {
		let { tasks } = this.state
		// let index = this.findIndex(id)
		let index = _.findIndex(tasks, (task) => {
			return task.id === id
		})
		if (index !== -1) {
			tasks[index].status = !tasks[index].status
			this.setState({
				tasks: tasks
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	}

	findIndex = (id) => {
		let { tasks } = this.state
		let result = -1
		tasks.forEach((task, index) => {
			if(task.id === id) {
				result = index
			}
		})
		return result
	}

	onDelete = (id) => {
		let { tasks } = this.state
		let index = this.findIndex(id)
		if (index !== -1) {
			tasks.splice(index, 1)
			this.setState({
			tasks: tasks
		})
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		this.onCloseForm()
	}

	onEdit = (id) => {
		let { tasks } = this.state
		let index = this.findIndex(id)
		let taskEditing = tasks[index]
		this.setState({
			taskEditing: taskEditing
		})
		this.onOpenForm()
	}

	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus, 10)
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		})
	}

	onSearch = (keyword) => {
		this.setState({
			keyword: keyword
		})
	}

	onSort = (sortBy, sortValue) => {
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		})
	}

  	render() {
  		let { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state

  		if(!!filter) {
  			if(!!filter.name) {
  				// tasks = tasks.filter((task) => {
  				// 	return task.name.toLowerCase().indexOf(filter.name) !== -1
  				// })
  				tasks = _.filter(tasks, (task) => {
  					return task.name.toLowerCase().indexOf(filter.name) !== -1
  				})
  			}
			tasks = tasks.filter((task) => {
				if(filter.status === -1) {
					return task
				} else {
					return task.status === (filter.status === 1 ? true : false)
				}
			})
		}

		if(!!keyword) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyword) !== -1
			})
		}


		if(sortBy === 'name') {
			tasks.sort((task1, task2) => {
				if(task1.name > task2.name) return sortValue
				else if (task1.name < task2.name) return -sortValue
				else return 0
			})
		} else {
			tasks.sort((task1, task2) => {
				if(task1.status > task2.status) return -sortValue
				else if (task1.status < task2.status) return sortValue
				else return 0
			})
		}

  		let elmTaskForm = !!isDisplayForm ?
  			<TaskForm
  				onCloseForm={ this.onCloseForm }
  				onSubmit={ this.onSubmit }
  				task={ taskEditing }
  			/> : ''
	  	return (
	  		<div className="container">
	  			<div className="text-center">
	  				<h1>Task Management</h1><hr />
	  			</div>
	  			<div className="row">
	  				<div className= { !!isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
	  					{/* Task Form */}
	  					{ elmTaskForm }
	  				</div>
	  				<div className= { !!isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
	  					<button
	  						type="button"
	  						className="btn btn-success"
	  						onClick={ this.onToggleForm }
	  					>
	  						<span className="fa fa-plus mr-5"></span>
	  						&nbsp;
	  						Add Task
	  					</button>
	  					{/* Search - Sort */}
	  					<SearchSort
	  						onSearch = { this.onSearch }
	  						onSort = { this.onSort }
	  						sortBy= { sortBy }
	  						sortValue= { sortValue }
	  					/>
	  					{/* List */}
	  					<div className="row mt-15">
	  						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	  							<TaskList
	  								tasks = { tasks }
	  								onUpdateStatus= { this.onUpdateStatus }
	  								onDelete= { this.onDelete }
	  								onEdit= { this.onEdit }
	  								onFilter= { this.onFilter }
	  							/>
	  						</div>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  	)
	}
}

export default App
