import { useContext } from "react";
import uniqid from 'uniqid';

import { LoggedDataContext } from "../../contexts/loggeddata.context";

const SummaryContainer = () => {
    return(
        <div className="container">
            <div>This week's macros</div>
            <div>This week's calorie total</div>
            
            <div>Macros graph</div>
            <div>Micros graph</div>

        </div>
    )
}
export default SummaryContainer;