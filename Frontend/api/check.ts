//INTERMEDIARY API
import type { VercelRequest, VercelResponse } from '@vercel/node';

const check = async (req: VercelRequest, res: VercelResponse) => {
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        res.status(500).json({ message: 'API key is not set' });
        return;
    }
    
    // Obtain the params sended by GET query
    const email = req.query.email as string;
    const phone = req.query.phone as string;

    const queryParams = new URLSearchParams({ email, phone });

    const API_URL = process.env.API_URL;
    const url = `${API_URL}/users/check?${queryParams.toString()}`;
    //const result = await fetch('https://multi-step-form-production-424f.up.railway.app/users', {

    const result = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        }
    });
  
    const data = await result.json();
    res.status(result.status).json(data);
}

export default check;