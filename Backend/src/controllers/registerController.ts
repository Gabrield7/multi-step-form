import { Request, Response} from 'express';
import { getRegister, insertRegister } from '../models/register';
import { sendError, sendSuccess } from '../utils/responseHelpers';

class RegisterController {
    static createRegister = async (req: Request, res: Response) => {
        try {
            const user = req.body.user;
            const plan = req.body.plan;

            if(!user || !plan) {
                sendError(res, 400, 'User or Plan is required');
                return
            };
            
            await insertRegister(user, plan);

            sendSuccess(res, 201, 'User and Plan successfully registered');
        } catch (error) {
            sendError(res, error, 'An internal server error occurred while trying to register your submission. Please try again later.');
        }
    }
    
    static listRegisters = async (req: Request, res: Response) => { //available only for dev
        try {
            const registers = await getRegister();

            if (!registers || registers.length === 0) {
                sendSuccess(res, 200, 'No registers found.', []);
                return
            }

            sendSuccess(res, 200, 'Registers retrieved successfully.', registers);
        } catch (error) {
            sendError(res, error, 'An internal server error occurred while retrieving registers. Please try again later.');
        }
    }
}

export { RegisterController }