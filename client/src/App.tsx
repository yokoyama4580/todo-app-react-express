import React, { useEffect, useState } from 'react';
import './App.css';
import nikukyuImage from './images/nikukyu.png';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const API_BASE = 'http://localhost:3000/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Fetch failed:', error));
  }, []);

  // Todoの追加
  const handleAddTodo = async (e: React.FormEvent) => {
    // ページのリロードを防ぐ
    e.preventDefault();

    // 空文字を棄却
    if (!title.trim()) return;
    // すでに登録されているtodoを棄却
    const isDeplicate = todos.some((todo) => todo.title === title.trim());
    if (isDeplicate) return;

    // エラーハンドリング
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
        // 入力フィールドの初期化
        setTitle("");
      } else {
        // レスポンスが正常でない場合の処理
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Todoの削除
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
        // 現在のTodosオブジェクト配列をコピー
        const newTodos: Todo[] = [...todos];
        // 削除ボタンが押されたidのオブジェクトを除外
        const filterTodos = newTodos.filter((todo: Todo) => todo.id != deleteId);
        // Todosオブジェクト配列を更新
        setTodos(filterTodos);
      } else {
        // レスポンスが正常でない場合の処理
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // トグル
  const handleToggle = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const { message, todo: updateTodo } = await response.json();
        console.log(message);
        setTodos((prevTodos) => 
          prevTodos.map((todo) => {
            return todo.id === id ? updateTodo : todo;
          })
        );
      } else {
        // レスポンスが正常でない場合の処理
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
          <li key={todo.id} onClick={() => handleToggle(todo.id)}>
            {todo.title} {todo.completed ? '✔️' : '❌'}
            <button onClick={(e) => {
              e.stopPropagation(); // これで li の onClick を止める
              handleDelete(todo.id);
            }}>
              削除
            </button>
          </li>
        ))}
  
      </ul>
    </div>
  );
}

export default App;
