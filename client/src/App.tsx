import React, { useEffect, useState } from 'react';
import './App.css';
import nikukyuImage from './images/nikukyu.png';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Fetch failed:', error));
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const { message, newTodo } = await response.json();
        console.log(message);
        setTodos((prevTodo) => [...prevTodo, newTodo]);
        setTitle("");
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h1 style={{ margin: 0 }}>Todo List</h1>
        <img src={nikukyuImage} alt="nikukyu" style={{ height: '100px' }} />
      </div>
      <form onSubmit={handleAddTodo}>
        <input
          type='text'
          placeholder='Todoを入力してください'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type='submit'>追加</button>
      </form>
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
