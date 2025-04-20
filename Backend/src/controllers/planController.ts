import { Request, Response } from 'express';
import { getPlanByUserID, getPlans, IPlan } from "../models/plan";
import { sendError, sendSuccess } from '../utils/responseHelpers';
import { AppError } from '../utils/AppError';

class PlanController {
    static listPlans = async (req: Request, res: Response) => { //available only for dev
        try {
            const plans = await getPlans();

            if (!plans || plans.length === 0) {
                sendSuccess(res, 200, 'No plans found.');
                return
            }

            sendSuccess(res, 200, 'Plans retrieved successfully.', plans);
        } catch (error) {
            sendError(res, error, 'An internal server error occurred while retrieving plans. Please try again later.');
        }
    }

    static listPlanByUserID = async (req: Request, res: Response) => { //available only for dev
        try {
            const userID = req.params.id;

            if(!userID) {
                throw new AppError('User ID is required', 400);
            };

            const result = await getPlanByUserID(userID);

            // if(result === 0){
            //     sendSuccess(res, 200, 'User not found.');
            //     return
            // }

            sendSuccess(res, 200, `Plan from User ID: ${userID} retrieved successfully`, result);
        } catch(error) {
            sendError(res, error, 'An internal server error occurred while retrieving users. Please try again later.');
        }
    }

    static updatePlan = async (req: Request, res: Response) => { //available only for dev
        try {
            const body: Partial<IPlan> = req.body;
            const validKeys = ['name', 'cycle', 'addons', 'price'];
            const validNames = ['Arcade', 'Advanced', 'Pro'];
            const validCycles = ['monthly', 'yearly'];
            const validAddons = ['Online service', 'Larger storage', 'Customizable profile'];

            const isPlanType = (body: any): body is Partial<IPlan> => { // returns a boolean
                if (typeof body !== 'object' || body === null) return false;
            
                return Object.keys(body).every(key => validKeys.includes(key)); //checks if body has the key props of IUser, if it has, returns true
            }

            if (!isPlanType(body) || Object.keys(body).length === 0) {
                throw new AppError('Invalid plan data', 400);
            }

            let errorMessage: string[] = [];
    
            if (body.name && !validNames.includes(body.name)) {
                errorMessage.push("Invalid plan name. Choose between 'Arcade', 'Advanced' and 'Pro'");
            }
    
            if (body.cycle && !validCycles.includes(body.cycle)) {
                errorMessage.push("Invalid cycle type. Choose between 'monthly' and 'yearly'");
            }
    
            if (body.price && typeof body.price !== 'number') {
                errorMessage.push('Invalid price value');
            }
    
            if (body.addons) {
                if (!Array.isArray(body.addons)) {
                    errorMessage.push('Addons must be an array');
                }else{
                    const invalidAddons = body.addons.filter(addon => !validAddons.includes(addon));
                    if (invalidAddons.length > 0) {
                        errorMessage.push(`Invalid addons: ${invalidAddons.join(', ')}`);
                    }
                }
            }

            if (errorMessage.length !== 0){
                throw new AppError(errorMessage.join(';\n'), 400);
            }

            sendSuccess(res, 200, 'Plan updated successfully.', { id: req.params.id, ...body });
        } catch(error) {
            sendError(res, error, 'An internal server error occurred while retrieving users. Please try again later.');
        }
    }

    static deletePlan = async (req: Request, res: Response) => { //available only for dev
    }
}

export { PlanController }