import { Router } from "express";
import { PlanController } from "../controllers/planController";

const router = Router();

router
    .get('/plans', PlanController.listPlans)
    .get('/plans/:id', PlanController.listPlanByUserID)
    .put('/plans/:id', PlanController.updatePlan)

export default router