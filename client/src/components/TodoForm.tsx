import React, { useState } from "react";

// TodoForm コンポーネント
interface TodoFormProps {
  onAdd: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");

  // form の状態が submit になったとき呼び出す関数
  const handleSubmit = (e: React.FormEvent) => {
    // ページのリロードを防ぐ
    e.preventDefault();
    // 空白は棄却
    if (!title.trim()) return;
    // handleAddTodo を呼び出す
    onAdd(title);
    // 入力フィールドを初期化
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Todoを入力してください'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit'>追加</button>
    </form>
  );
};

export default TodoForm;