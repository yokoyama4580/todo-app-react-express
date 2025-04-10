import { Todo } from '../type';

// TodoItem コンポーネント
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li>
        <span onClick={() => onToggle(todo.id)}>
            {todo.title}  {todo.completed ? '✔️' : '❌'}
        </span>
        <button onClick={() => onDelete(todo.id)}>削除</button>
    </li>
  );
};

export default TodoItem;