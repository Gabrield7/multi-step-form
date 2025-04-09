import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router
    .get('/users', UserController.listUser)
    .delete('/users/:id', UserController.excludeUser)

export default router
