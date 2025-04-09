import { Router } from "express";
import { PlanController } from "../controllers/planController";

const router = Router();

router.get('/plans', PlanController.listPlan)

export default router