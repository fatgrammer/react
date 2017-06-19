import React from 'react'
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    })
                    this.input.value=""
                }
                }>
                    Add Todo</button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}


const render = () => {
    ReactDOM.render(
        <ToDOapp />,
        document.getElementById('root')
    )
}
store.subscribe(render);
render();