import { dummyfood } from "../modules/convtograms";
import { useState } from "react";
import Log from "./loglist";
import MakeFoodEntry from "./makefoodentry";
import SearchFoodOptions from "./searchfoods";
import SearchExercise from "./searchexercise";

const DayLog = (props) => {
  const appIdAndKey = props.credentials;
  const [addingFood, setAddingFood] = useState(false);
  const [addingExercise, setAddingExercise] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);

  const addFoodEntry = (data) => {
    console.log(data);
    const newData = data.map((datum) => {
      return {
        name: datum.food_name,
        quantity: datum.serving_qty,
        weight: datum.serving_weight_grams,
        calories: datum.metadata.nf_calories,
        cholesterol: datum.metadata.nf_cholesterol,
        fiber: datum.metadata.nf_dietary_fiber,
        potassium: datum.metadata.nf_potassium,
        protein: datum.metadata.nf_protein,
        saturatedFat: datum.metadata.nf_saturated_fat,
        sodium: datum.metadata.nf_sodium,
        sugars: datum.metadata.nf_sugars,
        carbohydrates: datum.metadata.nf_total_carbohydrate,
        fat: datum.metadata.nf_total_fat,
      };
    });
    setFoodList([...foodList, ...newData]);
    console.log(newData);
  };
  const addExerciseEntry = (data) => {
    const newData = data.map((datum)=>{
        return{
            name: datum.name,
            duration: datum.duration_min,
            calories: datum.nf_calories,
        }
    });
    console.log(data);

    console.log(newData);

    setExerciseList([...exerciseList, ...newData]);
  };
  return (
    <div>
      <h2>Date: </h2>
      <h3>Records:</h3>
      {addingFood ? (
        <div>
          <MakeFoodEntry credentials={appIdAndKey} getData={addFoodEntry} />
          <SearchFoodOptions credentials={appIdAndKey} />
        </div>
      ) : (
        <button onClick={setAddingFood(true)}>Add food entry</button>
      )}
      {addingExercise ? (
        <div>
          <SearchExercise
            credentials={appIdAndKey}
            getData={addExerciseEntry}
          />
        </div>
      ) : (
        <button onClick={setAddingExercise(true)}>Add exercise entry</button>
      )}
      <Log label="Food Intake" itemList={foodList} />
      <Log label="Exercise" itemList={exerciseList} />
    </div>
  );
};
export default DayLog;
