
import { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import Card from '../UI/Cart';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const { isLoading, sentRequest: fetchMeals, error } = useHttp();

    const transformMeals = (mealsData) => {
        const loadedMeals = [];

        for (const key in mealsData) {
            loadedMeals.push({
                id: key,
                name: mealsData[key].name,
                description: mealsData[key].description,
                price: mealsData[key].price,
            })
        }

        setMeals(loadedMeals);
    }

    useEffect(() => {
        fetchMeals({ url: 'https://react-http-bc183-default-rtdb.firebaseio.com/meals.json' }, transformMeals);
    }, [fetchMeals])

    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (error) {
        return <section className={classes.MealsError}>
            <p>{error}</p>
        </section>
    }

    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return <section className={classes.meals}>
        <Card>
            <ul>
                {meals.length > 0 && mealsList}
                {meals.length === 0 && <p>No meals found.</p>}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals