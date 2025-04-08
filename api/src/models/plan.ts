import { openDb } from "../dbConfig/dbConnect"

type AddonType = 'Online service' | 'Larger storage' | 'Customizable profile';

export interface IPlan {
    name: 'Arcade' | 'Advanced' | 'Pro'
    cycle: 'monthly' | 'yearly'
    addons: AddonType[]
    price: number
}

const createPlanTable = async () => {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS Plan (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            cycle TEXT NOT NULL,
            addons TEXT,
            price REAL,
            FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        );
    `)
}

const getPlans = async () => {
    const db = await openDb();

    const rows = await db.all('SELECT * FROM Plan');

    return rows.map(plan => ({
        ...plan,
        addons: JSON.parse(plan.addons)
    }));
}

const insertPlan = async (plan: IPlan, userId: number) => {
    const db = await openDb();

    const addonsString = JSON.stringify(plan.addons);

    db.run(
        `INSERT INTO Plan (user_id, name, cycle, addons, price) VALUES (?, ?, ?, ?, ?)`, 
        [userId, plan.name, plan.cycle, addonsString, plan.price]
    );
}

const deletePlan = async (id: number) => {
    const db = await openDb();

    await db.run(`DELETE FROM Plan WHERE id = ?`, [id]);
}

export { createPlanTable, getPlans, insertPlan, deletePlan };