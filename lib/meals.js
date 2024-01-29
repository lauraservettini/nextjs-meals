import sql from 'better-sqlite3';

const db = sql('meals.db');


export function getMeals() {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    //fetch data from database con .all() for multiple rows, get() for a single row, run() to insert
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    //fetch data from database con .all() for multiple rows, get() for a single row, run() to insert
    return db.prepare('SELECT * FROM meals WHERE slug =  ?').get(slug);
}
