import React, { useEffect, useState } from 'react';
import './App.css';
import nikukyuImage from './images/nikukyu.png';
import { Todo } from './type';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const API_BASE = 'http://localhost:3000/api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Fetch failed:', error));
  }, []);

  const handleAddTodo = async (title: string) => {
    // 重複チェック
    const isDeplicate = todos.some((todo) => todo.title === title.trim());
    if (isDeplicate) return;
    
    try {
      // サーバーにPOSTリクエストを送って、新しいtodoを追加
      // fetch によって、指定したURLにHTTPリクエストを送る
      const response = await fetch(`${API_BASE}/add`, {
        // HTTPリクエストはPOST
        method: 'POST',
        // json形式で送ることを明示
        headers: { 'Content-Type': 'application/json' },
        // titleをjsonに変更
        body: JSON.stringify({ title }),
      });

      // レスポンスが正常であれば、todosを更新
      if (response.ok) {
        // message(成功メッセージ) と newTodo(入力された新しいtodo) を分割代入により受け取る
        const { message, newTodo } = await response.json();
        console.log(message);
        // 新しい todo を配列の末尾に追加
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      } else {
        // レスポンスが正常でない場合の処理
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // サーバーDELETEリクエストを送って、todoを削除
      // 指定したURLにHTTPリクエストを送るために、fetchを使う
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        // HTTPリクエストはDELETE
        method: "DELETE",
        // json形式で送ることを明示
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // message(成功メッセージ)とdeleteId(削除されたid)を分割代入により受け取る
        const { message, deleteId} = await response.json();
        console.log(message);
        // deleteId と一致する todo を filter により削除
        setTodos((prevTodos) => prevTodos.filter((todo: Todo) => todo.id != deleteId));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      // サーバーPATCHリクエストを送って、todoを変更
      // 指定したURLにHTTPリクエストを送るために、fetchを使う
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // 分割代入でレスポンスを受け取る
        // todo に関してはエイリアスを設定（updateTodo）
        const { message, todo: updateTodo } = await response.json();
        console.log(message);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
        );
      } else {
        console.error('Failed to change toggle');
      }
    } catch (error) {
      console.error('Error:', error);
    };
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h1 style={{ margin: 0 }}>Todo List</h1>
        <img src={nikukyuImage} alt="nikukyu" style={{ height: '100px' }} />
      </div>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;