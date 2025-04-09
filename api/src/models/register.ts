import { openDb } from "../dbConfig/dbConnect";
import ShortUniqueId from "short-uuid";
import { insertPlan, IPlan } from "./plan";
import { insertUser, IUser } from "./user";

const getRegister = async () => {
    const db = await openDb();

    const query = await db.all(`
        SELECT 
            User.id as userId,
            User.name as user_name,
            User.email,
            User.phone,
            Plan.name as plan_name,
            Plan.cycle,
            Plan.addons,
            Plan.price
        FROM User
        LEFT JOIN Plan ON Plan.user_id = User.id
    `);

    const result = query.map(row => ({
        user: {
            userId: row.userId,
            name: row.user_name,
            email: row.email,
            phone: row.phone,
        },
        plan: {
            name: row.plan_name,
            cycle: row.cycle,
            addons: row.addons,
            price: row.price
        }
    }));

    return result;
};

const insertRegister = async (
    userData: IUser,
    planData: IPlan
) => {
    const db = await openDb();
    const userID = ShortUniqueId().generate();

    try {
        await db.exec("BEGIN TRANSACTION");

        // console.log('User recebido:', typeof userData);
        // console.log('Plan recebido:', typeof planData);
        
        await insertUser(userID, userData);
        await insertPlan(userID, planData);

        await db.exec("COMMIT");
        return { success: true };
    } catch (error) {
        await db.exec("ROLLBACK");
        throw error;
    }
};

export { getRegister, insertRegister };