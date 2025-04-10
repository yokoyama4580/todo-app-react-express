import React from 'react';
import { Todo } from '../type';
import TodoItem from './TodoItem';

// TodoList コンポーネント
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;