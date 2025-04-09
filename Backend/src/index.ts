import express from 'express';
import cors from 'cors';
import routes from './routes';
import { initDb } from './dbConfig/initDb';

const app = express();

app.use(cors());

app.use(express.json());
routes(app);

initDb();

app.listen(3000, () => console.log('api playing'));