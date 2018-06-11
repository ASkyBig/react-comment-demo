import React,{ Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export default class CommentApp extends Component {
	constructor () {
		super()
		this.state = {
			comments: []
		}
	}

	componentWillMount () {
		this._loadComments()
	}

	_loadComments () {
		let comts = localStorage.getItem('comments')
		if(comts) {
			comts = JSON.parse(comts)
			this.setState({
				comments: comts
			})
		}
	}

	_saveComments (comments) {
		localStorage.setItem('comments', JSON.stringify(comments))
	}

	handleSubmit (comment) {
		if(!comment) return
		if(!comment.username) return alert("输入用户名")
		if(!comment.content) return alert("输入评论")
		this.state.comments.push(comment)
		this.setState({
			comments: this.state.comments
		})
		this._saveComments(this.state.comments)
		console.log('coments',this.state.comments)
	}

	handleDeleteComment (index) {
		const comments = this.state.comments
		comments.splice(index, 1)
		this.setState({
			comments: this.state.comments
		})
		this._saveComments(comments)
	}

	render () {
		const {comments} = this.state
		return (
			<div className='wrapper'>
				<CommentInput onSubmit={this.handleSubmit.bind(this)} />
				<CommentList onDeleteComment={this.handleDeleteComment.bind(this)} comments={comments}/>
			</div>
		)
	}
}