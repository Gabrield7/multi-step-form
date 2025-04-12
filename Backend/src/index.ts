import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { initDb } from './dbConfig/initDb';
import { apiKeyAuth } from './middlewares/authAPI';

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

const app = express();

app.use(cors());

app.use(express.json());
app.use(apiKeyAuth);

routes(app);

initDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT);