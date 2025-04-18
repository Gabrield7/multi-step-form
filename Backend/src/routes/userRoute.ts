import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router
    .get('/users', UserController.listUser)
    .get('/users/check', UserController.checkData)
    .get('/users/:id', UserController.listUserByID)
    .put('/users/:id', UserController.updateUser)
    .delete('/users/:id', UserController.excludeUser)
    .delete('/users', UserController.excludeAll)

export default router
