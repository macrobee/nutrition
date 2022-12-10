import { useContext } from "react";
import uniqid from 'uniqid';

import { LoggedDataContext } from "../../contexts/loggeddata.context";

const SummaryContainer = () => {

    const {entryList} = useContext(LoggedDataContext);

    // const mostRecent7Entries = entryList.filter((entry)=>{entry.date < today && entry.date > earlierDate})
    
    //get entries from between dates x to y (default: today to today-7)
    //
    return(
        <div className="container">
            <div>This week's macros</div>
            <div>This week's calorie total</div>
            
            <div>Calories graph</div>
            <div>Macros graph</div>

        </div>
    )
}
export default SummaryContainer;