import React, { useEffect, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✔️' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
