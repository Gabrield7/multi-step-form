import { Request, Response } from 'express';
import { getPlans } from "../models/plan";

class PlanController {
    static listPlan = async (req: Request, res: Response) => { //available only for dev
        try {
            const plans = await getPlans();

            if (!plans || plans.length === 0) {
                res.status(200).json({ message: 'No plans found' });
                return
            }

            res.status(200).json(plans);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Intern error server' });
        }
    }
    
    // static createPlan = async (req: Request, res: Response) => {
    //     try {
    //         const { userID, ...planData } = req.body;

    //         if(!userID) res.status(400).json({ message: 'User ID for this plan is required' });

    //         await insertPlan(planData, userID);
            
    //         res.status(201).json({ message: 'Plan successfully registered' });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Intern error server' });
    //     }
    // }
}

export { PlanController }