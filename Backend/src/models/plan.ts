import { openDb } from "../dbConfig/dbConnect"

type AddonType = 'Online service' | 'Larger storage' | 'Customizable profile';

interface IPlan {
    name: 'Arcade' | 'Advanced' | 'Pro'
    cycle: 'monthly' | 'yearly'
    addons: AddonType[]
    price: number
}

const createPlanTable = async () => {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS Plan (
            user_id TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            cycle TEXT NOT NULL,
            addons TEXT,
            price INTEGER,
            FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        );
    `)
}

const getPlans = async () => { //available only for dev
    const db = await openDb();

    const plans = await db.all('SELECT * FROM Plan');

    return plans.map(plan => ({
        ...plan,
        addons: JSON.parse(plan.addons)
    }));
}

const getPlanByUserID = async (userID: string) => { //available only for dev
    const db = await openDb();

    const plan = await db.get(`SELECT * FROM Plan WHERE user_id = `, [userID]);
    if(!plan) return undefined;

    return {
        ...plan,
        addons: JSON.parse(plan.addons)
    };
}

const insertPlan = async (userId: string, plan: IPlan) => {
    const db = await openDb();

    const addonsString = JSON.stringify(plan.addons);

    await db.run(
        `INSERT INTO Plan (user_id, name, cycle, addons, price) VALUES (?, ?, ?, ?, ?)`, 
        [userId, plan.name, plan.cycle, addonsString, plan.price]
    );
}

const updatePlanByUserID = async (userID: string, data: Partial<IPlan>) => { //available only for dev
    const keys = Object.keys(data);
    if(keys.length === 0) return;

    const db = await openDb();

    const clause = keys.map(field => `${field} = ?`).join(', ');

    const adjustValues = () => {
        if(data.addons){
            const addonsString = JSON.stringify(data.addons);
            const dataAdjust = {
                ...data,
                addons: addonsString
            }

            return Object.values(dataAdjust);
        }

        return Object.values(data)
    }

    const result = await db.run(
        `UPDATE Plan
        SET ${clause}
        WHERE user_id = ?`, 
        [...adjustValues(), userID]
    );

    return result.changes; //returns 0 if no user was updated (id not exists)
}

const deletePlan = async (id: string) => { //available only for dev
    const db = await openDb();

    const result = await db.run(`DELETE FROM Plan WHERE id = ?`, [id]);

    return result.changes; //returns 0 if no user was deleted (id not exists)
}

export { createPlanTable, getPlans, getPlanByUserID, updatePlanByUserID, insertPlan, deletePlan, IPlan };
