import express, { Application, Request, Response } from "express";
import user from './userRoute';
import plan from './planRoute'
import register from './registerRoute'

const routes = (app: Application): void => {
    app.route("/").get((req: Request, res: Response) => {
        res.status(200).send('MULTI-STEP-FORM API PLAYING...');
    });
  
    app.use(
        express.json(),
        register,
        user,
        plan
    );
};
  
export default routes;