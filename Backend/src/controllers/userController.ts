import { Request, Response } from 'express';
import { getUsers, checkUserData, deleteUser, deleteAll, IUser, getUserById, updateUser } from '../models/user';
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
        } catch(error) {
            sendError(res, error, 'An internal server error occurred while retrieving users. Please try again later.');
        }
    }

    static listUserByID = async (req: Request, res: Response) => { //available only for dev
        try {
            const id = req.params.id;

            if(!id) {
                throw new AppError('User ID is required', 400);
            };

            const result = await getUserById(id);

            // if(result === 0){
            //     sendSuccess(res, 200, 'User not found.');
            //     return
            // }

            sendSuccess(res, 200, `User ID: ${id} retrieved successfully`, result);
        } catch(error) {
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

    static updateUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const body: Partial<IUser> = req.body;

            const userCheck = body.email? checkUserData('email', body.email) : false;
            const phoneCheck = body.phone? checkUserData('phone', body.phone) : false;
            
            if(userCheck || phoneCheck){
                throw new AppError('Data already registered', 400);
            }

            const isUserType = (body: any): body is Partial<IUser> => { // returns a boolean
                if (typeof body !== 'object' || body === null) return false;
            
                const validKeys = ['name', 'email', 'phone'];
            
                return Object.keys(body).every(key => validKeys.includes(key)); //checks if body has the key props of IUser, if it has, returns true
            }

            if(!isUserType(body) || Object.keys(body).length === 0){
                throw new AppError('Invalid User', 400);
            }

            if(
                (body.name && !body.name.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s+[a-zA-ZÀ-ÖØ-öø-ÿ]{2,})+$/)) ||
                (body.email && !body.email.match(/\S+@\S+\.\S+/)) ||
                (body.phone && !body.phone.match(/^(?:\D*\d\D*){8,15}$/))
            ){
                throw new AppError('Invalid user name, email adress or phone number', 400);
            }

            const id = req.params.id;

            const update = await updateUser(id, body);

            if(update === 0){
                throw new AppError('Invalid user name, email adress or phone number', 400);
            }

            sendSuccess(res, 200, 'User updated successfully.', { id: req.params.id, ...body });
        } catch(error) {
            sendError(res, error, 'An internal server error occurred while retrieving users. Please try again later.');
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
                sendSuccess(res, 200, 'User not found.');
                return
            };

            sendSuccess(res, 200, `User ID: ${id} removed successfully`);
        } catch (error) {
            sendError(res, error, 'An internal server error occurred while deleting the user. Please try again later.');
        }
    }

    static excludeAll = async (req: Request, res: Response) => { //available only for dev
        try {
            await deleteAll();

            sendSuccess(res, 200, 'Deleted all Users an Plans from database')
        }catch(error) {
            sendError(res, error, 'An internal server error occurred while deleting the user. Please try again later.');
        }
    }
}

export { UserController }