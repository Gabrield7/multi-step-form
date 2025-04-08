import { Router } from "express";
import { PlanController } from "../controllers/planController";

const router = Router();

router
    .get('/plans', PlanController.listPlan)
    .post('/plans', PlanController.createPlan)

export default router