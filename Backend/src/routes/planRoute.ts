import { Router } from "express";
import { PlanController } from "../controllers/planController";

const router = Router();

router
    .get('/plans', PlanController.listPlan)
    .put('/plans/:id', PlanController.updatePlan)

export default router