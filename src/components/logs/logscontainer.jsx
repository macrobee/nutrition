import DayLog from './daylog';
import uniqid from 'uniqid';

import { SearchResultsProvider } from '../../contexts/searchresults.context';

const LogsContainer = () => {
    const listOfDayEntries = [1,2]
    return(
        <div className="container">
            all the day logs go here
            {listOfDayEntries.map((entry)=>{
                return (<SearchResultsProvider key={uniqid()}>
                    <DayLog key={uniqid()} number={entry}/>
                </SearchResultsProvider>)
            })}
        </div>
    )
}

export default LogsContainer;