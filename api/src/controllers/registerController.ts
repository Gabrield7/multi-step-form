import { Request, Response} from 'express';
import { getRegister, insertRegister } from '../models/register';


class RegisterController {
    static createRegister = async (req: Request, res: Response) => {
        try {
            const user = req.body.user;
            const plan = req.body.plan;

            if(!user || !plan) {
                res.status(400).json({ message: 'User or Plan is required' });
                return
            };
            
            await insertRegister(user, plan);

            res.status(201).json({ message: 'User and Plan successfully registered' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Intern error server' });
        }
    }
    
    static listRegisters = async (req: Request, res: Response) => { //available only for dev
        try {
            const registers = await getRegister();

            if (!registers || registers.length === 0) {
                res.status(200).json({ message: 'No registers found' });
                return
            }

            res.status(200).json(registers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Intern error server' });
        }
    }
    // static excludeRegister = async (req: Request, res: Response) => {
    //     try {
    //         const id = req.params.id;
            
    //         if(!id) {
    //             res.status(400).json({ message: 'User ID is required' });
    //             return
    //         };

    //         const result = await deleteRegister(id);

    //         if(result === 0) {
    //             res.status(404).json({ message: 'User not found' });
    //             return
    //         };

    //         res.status(200).send({message: 'User removed successfully'});
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Intern error server' });
    //     }
    // }
}

export { RegisterController }