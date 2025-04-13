import { Request, Response } from 'express';
import { deleteUser, getUsers, checkUserData } from '../models/user';
import { sendSuccess, sendError } from '../utils/responseHelpers';
import { AppError } from '../utils/AppError';

class UserController {
    static listUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const users = await getUsers();

            if (!users || users.length === 0) {
                sendSuccess(res, 200, 'No users found.');
                return
            }

            sendSuccess(res, 200, 'Users retrieved successfully.', users);
        } catch (error) {
            sendError(res, error, 'An internal server error occurred while retrieving users. Please try again later.');
        }
    }

    static checkData = async (req: Request, res: Response) => {
        try {
            const { email, phone } = req.query;

            if (!email && !phone) {
                throw new AppError('You must provide at least an email or phone to check', 400);
            };

            const checkEmail = email? await checkUserData('email', email as string) : undefined;
            const checkPhone = phone? await checkUserData('phone', phone as string) : undefined;

            const response = {checkEmail, checkPhone};

            sendSuccess(res, 200, 'Data successfully checked', response);
        } catch (error) {
            sendError(res, error, 'Error checking data');
        }
    }

    static excludeUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const id = req.params.id;

            if(!id) {
                throw new AppError('User ID is required', 400);
            };

            const result = await deleteUser(id);

            if(result === 0) {
                sendSuccess(res, 200, 'User not found');
                return
            };

            sendSuccess(res, 200, `User ID: ${id} removed successfully`);
        } catch (error) {
            sendError(res, error, 'An internal server error occurred while deleting the user. Please try again later.');
        }
    }
}

export { UserController }