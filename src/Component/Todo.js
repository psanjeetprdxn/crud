import React, { Component } from 'react';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        todos: ''
      },
      buttonValue: 'Add',
      buttonEvent: this.handleAdd,
      todos: [],
      checked: false,
      id: 1,
      currentId: 0
    }

    this.handleTodosChange = this.handleTodosChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  handleTodosChange = event => {
    this.setState({
      form: {
        todos: event.target.value
      }
    })

  }

  handleAdd = event => {
    let input = {
      id: this.state.id,
      todo: this.state.form.todos,
      completed: false
    };

    this.state.todos.push(input);

    this.setState({
      form: {
        todos: ""
      },
      id: this.state.id + 1
    })
    event.preventDefault();
  }

  handleEdit = event => {
    let id = event.target.parentNode.parentNode.firstChild.innerHTML;

    console.log(id);
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].id == id) {
        this.setState({
          form: {
            todos: this.state.todos[i].todo
          },
          buttonValue: 'Update',
          buttonEvent: this.handleUpdate,
          currentId: id
        })
      }
    }
  }

  handleDelete = event => {
    let id = event.target.parentNode.parentNode.firstChild.innerHTML;

    for( let i = 0; i < this.state.todos.length; i++){
      if ( this.state.todos[i].id == id) {
        this.state.todos.splice(i, 1);
      }
    }

    this.setState({
      todos: this.state.todos
    })

  }

  handleUpdate = event => {
    let id = this.state.currentId;

    for (let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i].id == id) {
        this.state.todos[i].todo = this.state.form.todos
      }
    }

    this.setState({
      todos: this.state.todos,
      form: {
        todos: ""
      },
      buttonEvent: this.handleAdd,
      buttonValue: "Add"
    })

    event.preventDefault();
  }

  handleCompletedChange = event => {
    let id = event.target.parentNode.parentNode.firstChild.innerHTML;
    for (let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i].id == id) {
        this.state.todos[i].completed = (this.state.todos[i].completed) ? false: true;
      }
    }
    this.setState({
      todos: this.state.todos
    })
  }

  render() {

    const displayNone = {
      display: 'none'
    }
    const backgroundColorGreen = {
      background: 'green'
    }
    const backgroundColorRed = {
      background: 'red'
    }

    let { todos } = this.state;
    let todoItems = todos.map((todo) =>
      <tr key={todo.id} style={ (todo.completed) ? backgroundColorGreen : backgroundColorRed }>
        <td style={ displayNone }>
          { todo.id }
        </td>
        <td>
          { todo.todo }
        </td>
        <td>
          <button onClick={ this.handleEdit }>Edit</button>
        </td>
        <td>
          <button onClick={ this.handleDelete }>Delete</button>
        </td>
        <td>
          <input
              name="Completed"
              type="checkbox"
              checked={ todo.completed }
              onChange={ this.handleCompletedChange } />
          </td>
      </tr>
    );

    return (
      <React.Fragment>
        <form>
          <input
            type="text"
            value={ this.state.form.todos }
            onChange={ this.handleTodosChange }
            placeholder="To do" />
          <button onClick={ this.state.buttonEvent }>{ this.state.buttonValue }</button>
        </form>
        <table>
          {/* { todoItems.map((todoItem) => todoItem) } */}
          <tbody>
            <tr>
              <th>Todo</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Completed</th>
            </tr>
            { todoItems }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Todo;