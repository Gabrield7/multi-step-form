import { openDb } from "../dbConfig/dbConnect"
import { AppError } from './../utils/AppError';

interface IUser {
    name: string;
    email: string;
    phone: string;
}

const createUserTable = async () => {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS User (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT UNIQUE NOT NULL
        );

        CREATE TRIGGER IF NOT EXISTS limit_user_insert
        BEFORE INSERT ON User
        WHEN (SELECT COUNT(*) FROM User) >= 10
        BEGIN
        SELECT RAISE(FAIL, 'User limit reached');
        END;
    `);
};

const getUsers = async () => { //available only for dev
    const db = await openDb();

    return db.all('SELECT * FROM User');
}

const getUserById = async (id: string) => { //available only for dev
    const db = await openDb();

    const user =  db.get(`SELECT * FROM User WHERE id = ?`, [id]);

    if(!user){
        throw new AppError('User not found.', 400);
    }

    return user;
}

const checkUserData = async (dataKey: 'email' | 'phone', value: string) => {
    const db = await openDb();

    if (!['email', 'phone'].includes(dataKey)) {
        throw new AppError('Invalid field for verification.', 400);
    }

    const existingData = await db.get(`SELECT id FROM User WHERE ${dataKey} = ?`, [value]);

    return !!existingData; //if exists, return a boolean (true)
}

const insertUser = async (id: string, user: IUser) => { //available only for dev
    const db = await openDb();
    
    await db.run(
        `INSERT INTO User (id, name, email, phone) VALUES (?, ?, ?, ?)`, 
        [id, user.name, user.email, user.phone]
    );
};

const updateUser = async (id: string, data: Partial<IUser>) => { //available only for dev
    const db = await openDb();

    const clause = Object.keys(data).map(field => `${field} = ?`).join(', ');

    const values = Object.values(data);

    const result = await db.run(
        `UPDATE User 
        SET ${clause}
        WHERE id = ?`, 
        [...values, id]
    );

    return result.changes; //returns 0 if no user was updated (id not exists)
}

const deleteUser = async (id: string) => { //available only for dev
    //await getUserById(id); //if the id nos exists, throw an error
    const db = await openDb();

    const result = await db.run(`DELETE FROM User WHERE id = ?`, [id]);

    return result.changes; //returns 0 if no user was deleted (id not exists)
};

const deleteAll = async () => {
    const db = await openDb();

    await db.run( `DELETE FROM User`);
}

export { 
    createUserTable, 
    getUsers, 
    getUserById, 
    checkUserData, 
    insertUser, 
    updateUser, 
    deleteUser, 
    deleteAll, 
    IUser 
};

