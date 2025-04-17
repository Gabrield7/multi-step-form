import { Request, Response} from 'express';
import { getRegister, insertRegister } from '../models/register';
import { sendError, sendSuccess } from '../utils/responseHelpers';
import { checkUserData } from '../models/user';
import { AppError } from '../utils/AppError';

class RegisterController {
    static createRegister = async (req: Request, res: Response) => {
        try {
            const user = req.body.user;
            const plan = req.body.plan;

            if(!user || !plan) {
                throw new AppError('User or Plan is required', 400);
            };

            const checkEmail = await checkUserData('email', user.email);
            const checkPhone = await checkUserData('phone', user.phone);

            const getDuplicateMessage = (checkEmail: boolean, checkPhone: boolean): string => {
                if (checkEmail && checkPhone) 
                    return 'Phone number and email already registered, please choose another one';
                if (checkEmail) 
                    return 'Email already registered, please choose another one';
                return 'Phone number already registered, please choose another one';
            }

            if(checkEmail || checkPhone){
                throw new AppError(getDuplicateMessage(checkEmail, checkPhone), 409);
            }

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