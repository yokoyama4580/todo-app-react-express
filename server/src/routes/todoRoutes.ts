import { Router } from 'express';
import { getTodos } from '../controllers/todoController';
import { addTodos } from '../controllers/todoController';
import { deleteTodos } from '../controllers/todoController';
import { toggleTodos } from '../controllers/todoController';

const router = Router();

router.get('/todos', getTodos);
router.post('/add', addTodos);
router.delete('/todos/:id', deleteTodos);
router.patch('/todos/:id', toggleTodos);

export default router;
