import express, { Application, Request, Response } from "express";
import user from './userRoute';
import plan from './planRoute'

const routes = (app: Application): void => {
    app.route("/").get((req: Request, res: Response) => {
        res.status(200).send('hello world');
    });
  
    app.use(
        express.json(),
        user,
        plan
    );
};
  
export default routes;