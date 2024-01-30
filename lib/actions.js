'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text){
    return (!text || text.trim() === '');
}

function isInvalidEmail(text){
    return !(text.includes('@'));
}

function isInvalidImage(image){
    return !image || image.size === 0 ;
}
export async function shareMeal(prevState, formData) {
    
    const meal = {
        title: formData.get('title'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        summary: formData.get('summary'),
        image: formData.get('image'),
        instructions: formData.get('instructions')
    }
    
    if(isInvalidText(meal.title) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.email) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidEmail(meal.creator_email) ||
    isInvalidImage(meal.image)
    ){
        return {message: 'Invalid input'};
    };
    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
  }