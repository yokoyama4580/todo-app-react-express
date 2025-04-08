import { Request, Response } from 'express';

export const getTodos = (req: Request, res: Response) => {
  res.json([
    { id: 1, title: '掃除する', completed: false },
    { id: 2, title: '勉強する', completed: true },
  ]);
};
