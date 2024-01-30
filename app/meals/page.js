import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css'
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by the community.',
};

async function Meals() {
        const meals = await getMeals();
      return <main className={classes.main}>
        <MealsGrid meals={meals}/>
      </main>

}
export default function MealsPage() {
    return (<>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="meals/share">Share your favorite Recipe</Link>
        </p>
      </header>
      <Suspense fallback={<p className={classes.loading}> Fetching meals...</p>}>
        <Meals />
      </Suspense>
    </>
    );
  }