import { useContext } from "react";
import uniqid from "uniqid";
import { ActiveLogContext } from "../../contexts/activelog.context";

import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { UserContext } from "../../contexts/userInformation.context";

import ProgressBar from "./progressbar";

import "./summary.styles.css";

const SummaryContainer = () => {
  const { entryList } = useContext(LoggedDataContext);
  const { userCaloricGoals, userMacroGoals } = useContext(UserContext);
  const { activeLog } = useContext(ActiveLogContext);

  console.log(activeLog);

  const { date, exercise, food } = activeLog;
  const intakeTotals = food
    .map((item) => item.nutrition)
    .reduce(
      (acc, cur) => {
        let {
          carbohydrates,
          cholesterol,
          fat,
          fiber,
          potassium,
          protein,
          saturatedFat,
          sodium,
          sugars,
        } = cur;
        return {
          carbohydrates: carbohydrates + acc.carbohydrates,
          cholesterol: cholesterol + acc.cholesterol,
          fat: fat + acc.fat,
          fiber: fiber + acc.fiber,
          potassium: potassium + acc.potassium,
          protein: protein + acc.protein,
          saturatedFat: saturatedFat + acc.saturatedFat,
          sodium: sodium + acc.sodium,
          sugars: sugars + acc.sugars,
        };
      },
      {
        carbohydrates: 0,
        cholesterol: 0,
        fat: 0,
        fiber: 0,
        potassium: 0,
        protein: 0,
        saturatedFat: 0,
        sodium: 0,
        sugars: 0,
      }
    );
  const totalCarbsConsumed = intakeTotals.carbohydrates;
  const totalFatsConsumed = intakeTotals.fat;
  const totalProteinConsumed = intakeTotals.protein;

  const totalCaloriesBurned = exercise
    .map((item) => item.calories)
    .reduce((acc, cur) => acc + cur, 0);
  const totalCaloriesConsumed = food
    .map((item) => item.calories)
    .reduce((acc, cur) => acc + cur, 0);

  // const mostRecent7Entries = entryList.filter((entry)=>{entry.date < today && entry.date > earlierDate})

  //get entries from between dates x to y (default: today to today-7)
  //
  const carbGramsGoal =
    (userMacroGoals.carbs * userCaloricGoals.calories) / 400;
  const fatGramsGoal = (userMacroGoals.fats * userCaloricGoals.calories) / 400;
  const proteinGramsGoal =
    (userMacroGoals.protein * userCaloricGoals.calories) / 400;

  return (
    <div className="summary-container">
      <div className="user-goal-container">
        BMR: {userCaloricGoals.calories} calories per day <br />
        <h4>Current macro goals:</h4> {userMacroGoals.carbs}% carbs,{" "}
        {userMacroGoals.fats}% fats, {userMacroGoals.protein}% protein <br />
        ({Math.round(carbGramsGoal)}g carbs, {Math.round(fatGramsGoal)}g fats, {Math.round(proteinGramsGoal)}g protein)
      </div>

      <div className="macro-intake-bar-container">
        Macro intake for {date} <br />
        Carbs: ({Math.round(totalCarbsConsumed)}g)
        <ProgressBar goal={carbGramsGoal} current={totalCarbsConsumed} />
        Fats: ({Math.round(totalFatsConsumed)}g)
        <ProgressBar goal={fatGramsGoal} current={totalFatsConsumed} />
        Protein: ({Math.round(totalProteinConsumed)}g)
        <ProgressBar goal={proteinGramsGoal} current={totalProteinConsumed} />
      </div>
      <div className="calorie-intake-bar-container">
        <h4>Calorie intake total</h4>
        <p>
          {Math.round(totalCaloriesConsumed)}/
          {Math.round(userCaloricGoals.calories + totalCaloriesBurned)}
        </p>
        <ProgressBar
        goal={userCaloricGoals.calories + totalCaloriesBurned}
        current={totalCaloriesConsumed}
      />
      </div>
      
      <div>Calories graph</div>
      <div>Macros graph</div>
    </div>
  );
};
export default SummaryContainer;
