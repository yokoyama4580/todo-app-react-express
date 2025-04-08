import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// ミドルウェア設定
app.use(cors());  // CORSを有効にして、フロントとバックエンドの異なるポート間の通信を許可
app.use(express.json());  // JSONリクエストを処理

// サンプルエンドポイント
app.get('/api/todos', (req, res) => {
  const todos = [
    { id: 1, title: 'サンプル Todo', completed: false },
    { id: 2, title: 'React学習', completed: false }
  ];
  res.json(todos);  // JSON形式でTodoリストを返す
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});