import { Request, Response } from 'express';
import { getPlans } from "../models/plan";
import { sendError, sendSuccess } from '../utils/responseHelpers';

class PlanController {
    static listPlan = async (req: Request, res: Response) => { //available only for dev
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
}

export { PlanController }