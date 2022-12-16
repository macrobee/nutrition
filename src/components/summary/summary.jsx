import { useContext } from "react";
import uniqid from "uniqid";
import { ActiveLogContext } from "../../contexts/activelog.context";

import { LoggedDataContext } from "../../contexts/loggeddata.context";
import { UserContext } from "../../contexts/userInformation.context";

import ProgressBar from "./progressbar";

const SummaryContainer = () => {
  const { entryList } = useContext(LoggedDataContext);
  const { userCaloricGoals, userMacroGoals } = useContext(UserContext);
  const { activeLog, setActiveLog } = useContext(ActiveLogContext);

  // const mostRecent7Entries = entryList.filter((entry)=>{entry.date < today && entry.date > earlierDate})

  //get entries from between dates x to y (default: today to today-7)
  //
  return (
    <div className="container">
      <div>
        BMR: {userCaloricGoals.calories} calories per day <br />
        Current macro goals: <br /> {userMacroGoals.carbs}% carbs,{" "}
        {userMacroGoals.fats}% fats, {userMacroGoals.protein}% protein <br />
        {(userMacroGoals.carbs * userCaloricGoals.calories) / 400}g carbs{" "}
        {(userMacroGoals.fats * userCaloricGoals.calories) / 400}g fats{" "}
        {(userMacroGoals.protein * userCaloricGoals.calories) / 400}g protein
      </div>

      <div>
        This week's macros Carbs:
        <ProgressBar goal={50} current={40} />
        Fats:
        <ProgressBar goal={40} current={10} />
        Protein:
        <ProgressBar goal={50} current={25} />
      </div>
      <div>This week's calorie total</div>
      <ProgressBar goal={2000} current={1100} />
      <div>Calories graph</div>
      <div>Macros graph</div>
    </div>
  );
};
export default SummaryContainer;
