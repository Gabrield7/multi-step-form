import { Router } from "express";
import { RegisterController } from "../controllers/registerController";

const router = Router();

router
    .get('/register', RegisterController.listRegisters)
    .post('/register', RegisterController.createRegister)

export default router;