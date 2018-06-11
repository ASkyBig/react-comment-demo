import React,{ Component } from 'react'

export default class CommentInput extends Component {
	constructor () {
		super()
		this.state = {
			username: '',
			content: ''
		}
	}

	componentWillMount () {
		this._loadUsername()
	}

	componentDidMount () {
		this.textarea.focus()
	}

	handleUsername (event) {
		this.setState({
			username: event.target.value
		})
	}

	hanleUsernameBlur (event) {
		this._saveUsername(event.target.value)
	}

	_saveUsername (username) {
		localStorage.setItem('username', username)
	}

	_loadUsername () {
		const uname = localStorage.getItem('username')
		if(uname) {
			this.setState({
				username: uname
			})
		}
	}

	handleContent (event) {
		this.setState({
			content: event.target.value
		})
	}

	handleSubmit () {
		const {username, content} = this.state
		this.props.onSubmit({username, content, createdTime: +new Date()})
		this.setState({
			content: ''
		})	
		// this.state.content = ''
	}

	render () {
		return (
			<div className='comment-input'>
		        <div className='comment-field'>
		          <span className='comment-field-name'>用户名：</span>
		          <div className='comment-field-input'>
		            <input value={this.state.username} onChange={this.handleUsername.bind(this)} onBlur={this.hanleUsernameBlur.bind(this)} />
		          </div>
		        </div>
		        <div className='comment-field'>
		          <span className='comment-field-name'>评论内容：</span>
		          <div className='comment-field-input'>
		            <textarea value={this.state.content} onChange={this.handleContent.bind(this)} ref={(textarea) => this.textarea = textarea} />
		          </div>
		        </div>
		        <div className='comment-field-button'>
		          <button onClick={this.handleSubmit.bind(this)}>
		            发布
		          </button>
		        </div>
	      </div>
		)
	}
}