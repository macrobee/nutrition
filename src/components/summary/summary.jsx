import { useContext } from "react";

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
import GraphContainerDiv from "./graphcontainer";

import "./summary.styles.css";

const SummaryContainer = () => {
  const { entryList } = useContext(LoggedDataContext);
  const { userCaloricGoals, userMacroGoals } = useContext(UserContext);
  const { activeLog } = useContext(ActiveLogContext);

  let activeDateRange = null;
  let entryInActiveDateRangeCount = 1;
  let summarizedEntriesInActiveDateRange = [];
  if (entryList.length) {
    //sets active date range as 7 days from most recent entry
    const end = entryList[0].dateObj;
    const start = new Date(end - 604800000); //need date 7 days before start date
    
    activeDateRange = {
      start,
      end,
    };
    const entriesInActiveDateRange = entryList.filter((entry) => {
      return (
        entry.dateObj - activeDateRange.start > 0 &&
        entry.dateObj - activeDateRange.end <= 0
      );
    });
    entryInActiveDateRangeCount = entriesInActiveDateRange.length;
    summarizedEntriesInActiveDateRange = entriesInActiveDateRange.map(
      (entry) => {
        const { date, food } = entry;
        const nutritionList = food.map((item) => item.nutrition);
        const foodTotalsForEntry = summarizeNutritionalData(nutritionList);
        const monthAndDay = date.slice(5);
        return {
          date: monthAndDay,
          carbs: Math.round(foodTotalsForEntry.carbohydrates * 4),
          fats: Math.round(foodTotalsForEntry.fat * 9),
          protein: Math.round(foodTotalsForEntry.protein * 4),
        };
      }
    );
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
  let calorieTotalGoal;

  //case if entry list is there and no log selected
  //assigns total numbers based on **full entry list**
  if (entryList.length && activeLog.id === "none") {
    const entriesInActiveDateRange = entryList.filter((entry) => {
      return (
        entry.dateObj - activeDateRange.start > 0 &&
        entry.dateObj - activeDateRange.end <= 0
      );
    });
    const intakeTotalList = entriesInActiveDateRange.map((entry) => {
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
    calorieTotalGoal =
      userCaloricGoals.calories * entryInActiveDateRangeCount +
      totalCaloriesBurned;
  } else {
    //assigns total numbers based on active log
    totalCarbsConsumed = intakeTotals.carbohydrates;
    totalFatsConsumed = intakeTotals.fat;
    totalProteinConsumed = intakeTotals.protein;

    totalCaloriesBurned = sumCaloriesFromList(exercise);
    totalCaloriesConsumed = sumCaloriesFromList(food);
    calorieTotalGoal = userCaloricGoals.calories + totalCaloriesBurned;
  }

  let carbGramsGoal;
  let fatGramsGoal;
  let proteinGramsGoal;

  carbGramsGoal = (userMacroGoals.carbs * userCaloricGoals.calories) / 400;
  fatGramsGoal = (userMacroGoals.fats * userCaloricGoals.calories) / 900;
  proteinGramsGoal = (userMacroGoals.protein * userCaloricGoals.calories) / 400;

  if (activeLog.id === "none") {
    carbGramsGoal = carbGramsGoal * 4;
    fatGramsGoal = fatGramsGoal * 9;
    proteinGramsGoal = proteinGramsGoal * 4;
  }

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
        Macro intake for{" "}
        {date === "0/0/0"
          ? `the past ${entryInActiveDateRangeCount} days`
          : date}{" "}
        <br />
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
          {Math.round(totalCaloriesConsumed)}/{Math.round(calorieTotalGoal)}
        </p>
        <ProgressBar goal={calorieTotalGoal} current={totalCaloriesConsumed} />
      </div>
      <GraphContainerDiv data={summarizedEntriesInActiveDateRange} />
    </div>
  );
};
export default SummaryContainer;
