import { Router } from 'express';
import { getTodos } from '../controllers/todoController';
import { addTodos } from '../controllers/todoController';

const router = Router();

router.get('/todos', getTodos);
router.get('/add', addTodos);

export default router;
