import { Request, Response } from 'express';
import { deleteUser, getUsers } from '../models/user';
import { sendSuccess, sendError } from '../utils/responseHelpers';

class UserController {
    static listUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const users = await getUsers();

            if (!users || users.length === 0) {
                sendSuccess(res, 200, 'No users found.', []);
                return
            }

            sendSuccess(res, 200, 'Users retrieved successfully.', users);
        } catch (error) {
            sendError(res, 500, 'An internal server error occurred while retrieving users. Please try again later.', error);
        }
    }

    static excludeUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const id = req.params.id;

            if(!id) {
                sendError(res, 400, 'User ID is required');
                return
            };

            const result = await deleteUser(id);

            if(result === 0) {
                sendSuccess(res, 200, 'User not found');
                return
            };

            sendSuccess(res, 200, `User ID: ${id} removed successfully`);
        } catch (error) {
            sendError(res, 500, 'An internal server error occurred while deleting the user. Please try again later.', error);
        }
    }
}

export { UserController }