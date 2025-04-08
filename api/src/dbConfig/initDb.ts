import { createPlanTable } from "../models/plan";
import { createUserTable } from "../models/user";

export const initDb = async () => {
    await createUserTable();
    await createPlanTable();
};