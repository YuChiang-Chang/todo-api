import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ onNewTodoAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/todos', { title });
            setTitle('');
            onNewTodoAdded(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="AddTodo" onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='請輸入待辦事項'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            >
            </input>
            <button type='submit'>添加待辦事項</button>
        </form>
    )
}

export default AddTodo;

