import './App.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/todos`);
      setTodos(response.data);
    } catch (error) {
      console.log('獲取待辦事項列表失敗', error);
    }
  }

  useEffect(() => {
    fetchTodos();
  },[]);

  const addTodo = (newTodo) => {
    setTodos(todos => [...todos, newTodo]);
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
      console.log('刪除待辦事項失敗', error);
    }
  }

  return (
    <div className="App">
      <h1>待辦事項管理</h1>
      <AddTodo onNewTodoAdded={addTodo}></AddTodo>
      <TodoList todos={todos} onDeleteTodo={deleteTodo}></TodoList>
    </div>
  );
}

export default App;
