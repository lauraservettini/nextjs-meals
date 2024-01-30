import fs from 'node:fs';

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  //fetch data from database con .all() for multiple rows, get() for a single row, run() to insert
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  //fetch data from database con .all() for multiple rows, get() for a single row, run() to insert
  return db.prepare("SELECT * FROM meals WHERE slug =  ?").get(slug);
}

export async function saveMeal(meal) {
  // use slugify
  meal.slug = slugify(meal.title, { lower: true });

  // use xss to sanitize input
  meal.instructions = xss(meal.instructions);

  // pop() remove the last value from an array and return that value
  const extension = meal.image.name.split('.').pop();

  const filename =`${meal.slug}.${extension}`;

  // crea il path per l'allocazione in memoria
  const stream = fs.createWriteStream(`public/images/${filename}`);

  // riferimento all'area in memoria, oggetto binario
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if(error){
        throw new Error('Saving image failed');
    }
  });

  // prepare the object to store on the database
  meal.image = `/images/${filename}`;

  // the object meal is atomatically destructored
  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, image, creator, creator_email, slug)
    VALUES
    (
        @title, 
        @summary, 
        @instructions, 
        @image,
        @creator, 
        @creator_email, 
        @slug 
        )
  `).run(meal);
}
