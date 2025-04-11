import { Response } from "express";

const sendSuccess = (res: Response, status = 200, message: string, data: any = null) => {
    return res.status(status).json({
        status,
        success: true,
        message,
        ...(data && { data })
    });
}

const sendError = (res: Response, status = 500, message: string, error: any = null) => {
    const isDev = process.env.NODE_ENV === 'development';

    return res.status(status).json({
        status,
        success: false,
        message,
        error: isDev ? error : 'Unexpected error'
    });
}

export { sendSuccess, sendError }