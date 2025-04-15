//INTERMEDIARY API
import type { VercelRequest, VercelResponse } from '@vercel/node';

const register = async (req: VercelRequest, res: VercelResponse) => {
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        res.status(500).json({ message: 'API key is not set' });
        return;
    }
    
    const API_URL = process.env.API_URL as string;

    const result = await fetch(`${API_URL}/register`, {
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

export default register;