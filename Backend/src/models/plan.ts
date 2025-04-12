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
            user_id TEXT NOT NULL,
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

    const rows = await db.all('SELECT * FROM Plan');

    return rows.map(plan => ({
        ...plan,
        addons: JSON.parse(plan.addons)
    }));
}

const insertPlan = async (userId: string, plan: IPlan) => {
    const db = await openDb();

    const addonsString = JSON.stringify(plan.addons);

    await db.run(
        `INSERT INTO Plan (user_id, name, cycle, addons, price) VALUES (?, ?, ?, ?, ?)`, 
        [userId, plan.name, plan.cycle, addonsString, plan.price]
    );
}

const deletePlan = async (id: string) => { //available only for dev
    const db = await openDb();

    const result = await db.run(`DELETE FROM Plan WHERE id = ?`, [id]);

    return result.changes; //returns 0 if no user was deleted
}

export { createPlanTable, getPlans, insertPlan, deletePlan, IPlan };