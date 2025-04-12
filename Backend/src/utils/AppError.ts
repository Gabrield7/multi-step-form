export class AppError extends Error {
    status: number;

    constructor(message: string, status: number = 400) {
        super(message);
        this.name = 'AppError';
        this.status = status;
    }
}