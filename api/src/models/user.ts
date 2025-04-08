import { openDb } from "../dbConfig/dbConnect"

interface IUser {
    name: string;
    email: string;
    phone: string;
}

const createUserTable = async () => {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL
        );
    `)
}

const getUsers = async () => {
    const db = await openDb();

    return db.all('SELECT * FROM User');
}

const insertUser = async (user: IUser) => {
    const db = await openDb();

    await db.run(
        `INSERT INTO User (name, email, phone) VALUES (?, ?, ?)`, 
        [user.name, user.email, user.phone]
    )
}

const deleteUser = async (id: string) => {
    const db = await openDb();

    const result = await db.run(`DELETE FROM User WHERE id = ?`, [id]);

    return result.changes; //returns 0 if no user was deleted
}

export { createUserTable, getUsers, insertUser, deleteUser }

