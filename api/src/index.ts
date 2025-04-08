import express from 'express';
import { initDb } from './dbConfig/initDb';

const app = express();
app.use(express.json());

initDb();

app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(3000, () => console.log('app rodando'));