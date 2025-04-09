import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(express.json());
app.use(cors());
// ルーティング設定（例: /api/todos）
app.use('/api', todoRoutes);

export default app;
