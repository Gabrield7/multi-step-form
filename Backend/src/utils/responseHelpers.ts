import { Response } from "express";
import { AppError } from "./AppError";

const sendSuccess = (res: Response, status = 200, message: string, data: any = null) => {
    return res.status(status).json({
        status,
        success: true,
        message,
        ...(data && { data })
    });
}

const sendError = (res: Response, error: any = null, backing: string) => {
    const message = error instanceof Error && error.message
        ? error.message
        : backing;

    const status = error instanceof AppError ? error.status : 500;

    return res.status(status).json({
        status,
        success: false,
        message,
        data: error.data
    });
}

export { sendSuccess, sendError }