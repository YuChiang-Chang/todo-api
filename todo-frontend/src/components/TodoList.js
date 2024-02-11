import React from 'react';

function TodoList({ todos, onDeleteTodo }) {
    return (
        <div className="TodoList">
            <h2>待辦事項列表</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <p>{todo.title}</p>
                        <button onClick={() => onDeleteTodo(todo._id)}>刪除</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;
