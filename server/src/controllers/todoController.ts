import { Request, Response } from 'express';

let todos: Todo[] = [];

type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
  console.log("a");
};

export const addTodos = (req: Request, res: Response) => {
  const {title} = req.body;

  if (!title || typeof title != 'string'){
    res.status(400).json({error: '無効な入力だよ'});
    return;
  }

  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false
  }

  todos.push(newTodo);
  
  res.status(201).json({message: 'Todoを追加したよ', newTodo});
  return;
};

export const deleteTodos = (req: Request, res: Response) => {

  const {id} = req.params;
  
  const todoIndex = todos.findIndex(todo => todo.id === Number(id));

  if (todoIndex === -1){
    res.status(404).json({mssage:'ToDoが見つかりません',deleteId: id})
    return;
  }

  todos.splice(todoIndex, 1);

  res.status(200).json({message:'ToDoを削除しました',deleteId: id});
  return;
}

export const toggleTodos = (req: Request, res: Response) => {
  const {id} = req.params;
  console.log('toggleTodosが呼び出されました',id);
  
  const todoIndex = todos.findIndex(todo => todo.id === Number(id));

  if (todoIndex === -1){
    res.status(404).json({message:'ToDoが見つかりません', toggleId: id});
    return;
  }

  todos[todoIndex].completed = !todos[todoIndex].completed;
  
  res.status(200).json({message: 'ToDoの状態を切り替えました', todo: todos[todoIndex]});
  return;
}
