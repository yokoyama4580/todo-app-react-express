import { Request, Response } from 'express';
import { todo } from 'node:test';

const todos = [
  { id: 1, title: '掃除する', completed: false },
  { id: 2, title: '勉強する', completed: true },
]

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const addTodos = (req: Request, res: Response) => {
  const testjson = { id: 3, title: '追加', completed: false };
  todos.push(testjson);
  res.status(201).json(testjson);
}
