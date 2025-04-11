//INTERMEDIARY API
import { Request, Response } from 'express';

if (process.env.NODE_ENV !== 'production') {
    import('dotenv').then(dotenv => dotenv.config());
}

const APIhandler = async (req: Request, res: Response) => {
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        res.status(500).json({ message: 'API key is not set' });
        return;
    }
  
    const result = await fetch('https://multi-step-form-production-424f.up.railway.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify(req.body),
    });
  
    const data = await result.json();
    res.status(result.status).json(data);
}

export default APIhandler