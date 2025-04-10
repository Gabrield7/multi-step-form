import { Request, Response, NextFunction } from 'express';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
    const clientKey = req.headers['x-api-key'];

    if (process.env.NODE_ENV === 'production' && clientKey !== process.env.API_KEY) {
        res.status(401).json({ message: 'Access denied' });
        return
    }

    next();
}