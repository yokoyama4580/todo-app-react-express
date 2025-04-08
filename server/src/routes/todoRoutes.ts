import { Router } from 'express';
import { getTodos } from '../controllers/todoController';

const router = Router();

router.get('/todos', getTodos);

export default router;
