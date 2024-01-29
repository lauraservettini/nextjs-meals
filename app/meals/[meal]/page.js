export default function MealDetail({ params}) {
    return (
      <main>
        <h1>MealDetail</h1>
        <p>{params.meal}</p>
      </main>
    );
  }