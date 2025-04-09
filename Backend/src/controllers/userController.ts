import { Request, Response } from 'express';
import { deleteUser, getUsers } from '../models/user';

class UserController {
    static listUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const users = await getUsers();

            if (!users || users.length === 0) {
                res.status(200).json({ message: 'No users found' });
                return
            }

            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Intern error server' });
        }
    }
    
    // static createUser = async (req: Request, res: Response) => {
    //     try {
    //         const user = req.body;
    //         await insertUser(user);
            
    //         res.status(201).json({ message: 'User successfully registered' });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Intern error server' });
    //     }
    // }

    static excludeUser = async (req: Request, res: Response) => { //available only for dev
        try {
            const id = req.params.id;

            if(!id) {
                res.status(400).json({ message: 'User ID is required' });
                return
            };

            const result = await deleteUser(id);

            if(result === 0) {
                res.status(404).json({ message: 'User not found' });
                return
            };

            res.status(200).send({message: 'User removed successfully'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Intern error server' });
        }
    }
}

export { UserController }