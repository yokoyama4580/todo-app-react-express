import express from 'express';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(express.json());

// ルーティング設定（例: /api/todos）
app.use('/api', todoRoutes);

export default app;
