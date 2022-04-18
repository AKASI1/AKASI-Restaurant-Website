import styles from "./Meals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";

const Meals = (props) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchfn = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://akasi-f4c98-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      let newMeals = [];
      for (const i in data) {
        newMeals.push({
          name: data[i].name,
          description: data[i].description,
          price: data[i].price,
        });
      }
      setMeals(newMeals);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchfn();
  }, []);

  let content = (
    <p className="text-light fs-4 fw-bold text-center my-5">No Meals</p>
  );
  if (loading) {
    content = (
      <p className="text-light fs-4 fw-bold text-center my-5">Loading...</p>
    );
  } else if (error) {
    content = (
      <div className="d-flex justify-content-center flex-column">
        <p className="text-light fs-4 fw-bold text-center mt-5">
          Something Went Wrong..
        </p>
        <button
          onClick={fetchfn}
          className="btn btn-danger textcenter mx-auto mb-5 mt-3"
        >
          Research
        </button>
      </div>
    );
  } else {
    content = (
      <Card>
        {meals.map((meal, idx) => (
          <MealItem
            key={idx}
            name={meal.name}
            des={meal.description}
            price={meal.price}
          />
        ))}
      </Card>
    );
  }
  return <section className={styles.meals}>{content}</section>;
};

export default Meals;
