export class AppError extends Error {
    status: number;
    data: any;

    constructor(
        message: string | Record<string, string>, 
        status: number = 400, 
        data: any = null
    ) {
        super(typeof message === 'string' ? message : JSON.stringify(message));
        this.name = 'AppError';
        this.status = status;
        this.data = data
    }
}

