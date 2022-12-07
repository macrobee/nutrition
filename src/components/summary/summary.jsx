import { useContext } from "react";
import uniqid from 'uniqid';

import { LoggedDataContext } from "../../contexts/loggeddata.context";

const SummaryContainer = () => {
    const {foodEntries} = useContext(LoggedDataContext);
    return(
        <div className="container">
            {/* {foodEntries.map((entry)=><p key={uniqid()}>{entry}</p>)} */}
            <div>This week's macros</div>
            <div>This week's calorie total</div>
            
            <div>Macros graph</div>
            <div>Micros graph</div>

        </div>
    )
}
export default SummaryContainer;