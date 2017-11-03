import React, { Component } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import style from './TodoItem.css'

export default class TodoItem extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDoubleClick () {
    this.setState({ editing: true })
  }

  handleSave (text) {
    const { todo, deleteTodo, editTodo } = this.props
    if (text.length === 0) {
      deleteTodo(todo.id)
    } else {
      editTodo(todo.id, text)
    }
    this.setState({ editing: false })
  }

  handleComplete () {
    const { todo, completeTodo } = this.props
    completeTodo(todo.id)
  }

  handleDelete () {
    const { todo, deleteTodo } = this.props
    deleteTodo(todo.id)
  }

  render () {
    const { todo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      )
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type='checkbox'
            checked={todo.completed}
            onChange={this.handleComplete}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button
            className={style.destroy}
            onClick={this.handleDelete}
          />
        </div>
      )
    }

    return (
      <li
        className={classnames({
          [style.completed]: todo.completed,
          [style.editing]: this.state.editing,
          [style.normal]: !this.state.editing
        })}
      >
        {element}
      </li>
    )
  }
}