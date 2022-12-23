import { useContext } from "react";
import uniqid from "uniqid";
import {
  summarizeNutritionalData,
  EMPTY_NUTRITION_OBJECT,
} from "./functions/summarizenutritionaldata";
import { sumCaloriesFromList } from "./functions/totalcaloriesfromlist";

import { ActiveLogContext } from "../../contexts/activelog.context";
import { DateContext } from "../../contexts/date.context";
import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { UserContext } from "../../contexts/userInformation.context";

import ProgressBar from "./progressbar";

import "./summary.styles.css";

const SummaryContainer = () => {
  const { entryList } = useContext(LoggedDataContext);
  const { userCaloricGoals, userMacroGoals } = useContext(UserContext);
  const { activeLog } = useContext(ActiveLogContext);
  const { getDateStrFromDateObj } = useContext(DateContext);

  let activeDateRange = null;
  if (entryList.length) {
    //sets active date range as 7 days from most recent entry
    const start = entryList[0].dateObj;
    const end = new Date(start - 604800000); //need date 7 days before start date
    activeDateRange = {
      start,
      end,
    };
  }
  const { date, exercise, food } = activeLog;
  const intakeTotals = summarizeNutritionalData(
    food.map((item) => item.nutrition)
  ); //returns intake totals for active log

  let totalCarbsConsumed;
  let totalFatsConsumed;
  let totalProteinConsumed;
  
  let totalCaloriesBurned;
  let totalCaloriesConsumed;

  //case if entry list is there and no log selected
    //assigns total numbers based on **full entry list**
  if (entryList.length && activeLog.id === "none") {
    const intakeTotalList = entryList.map((entry) => {
      if (entry.food.length) {
        const value = summarizeNutritionalData(
          entry.food.map((item) => item.nutrition)
        );
        return value;
      } else {
        return EMPTY_NUTRITION_OBJECT;
      }
    }); //creates array of intake totals for all entries

    const intakeTotalsForActiveDateRange =
      summarizeNutritionalData(intakeTotalList);

    totalCarbsConsumed = intakeTotalsForActiveDateRange.carbohydrates;
    totalFatsConsumed = intakeTotalsForActiveDateRange.fat;
    totalProteinConsumed = intakeTotalsForActiveDateRange.protein;

    totalCaloriesConsumed = sumCaloriesFromList(
      entryList.map((entry) => {
        const entryFoodList = entry.food;
        return { calories: sumCaloriesFromList(entryFoodList) };
      })
    );
    totalCaloriesBurned = sumCaloriesFromList(
      entryList.map((entry) => {
        const entryExerciseList = entry.exercise;
        return { calories: sumCaloriesFromList(entryExerciseList) };
      })
    );

  } else {//assigns total numbers based on active log
    totalCarbsConsumed = intakeTotals.carbohydrates;
    totalFatsConsumed = intakeTotals.fat;
    totalProteinConsumed = intakeTotals.protein;

    totalCaloriesBurned = sumCaloriesFromList(exercise);
    totalCaloriesConsumed = sumCaloriesFromList(food);
  }

  // const mostRecent7Entries = entryList.filter((entry)=>{entry.date < today && entry.date > earlierDate})

  //get entries from between dates x to y (default: today to today-7)
  //
  const carbGramsGoal =
    (userMacroGoals.carbs * userCaloricGoals.calories) / 400;
  const fatGramsGoal = (userMacroGoals.fats * userCaloricGoals.calories) / 900;
  const proteinGramsGoal =
    (userMacroGoals.protein * userCaloricGoals.calories) / 400;

  return (
    <div className="summary-container">
      <div className="user-goal-container">
        BMR: {userCaloricGoals.calories} calories per day <br />
        <h4>Current macro goals:</h4> {userMacroGoals.carbs}% carbs,{" "}
        {userMacroGoals.fats}% fats, {userMacroGoals.protein}% protein <br />(
        {Math.round(carbGramsGoal)}g carbs, {Math.round(fatGramsGoal)}g fats,{" "}
        {Math.round(proteinGramsGoal)}g protein)
      </div>

      <div className="macro-intake-bar-container">
        Macro intake for {date === "0/0/0" ? `the past 7 days` : date} <br />
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
