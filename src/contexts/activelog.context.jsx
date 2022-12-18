import { useEffect } from "react";
import { createContext, useState } from "react";

const defaultActiveLog = {id: "none", date:"0/0/0", exercise: [], food: []}
export const ActiveLogContext = createContext({
    activeLog: "", 
    setActiveLog: () => null,
    getLogData: () => null,
    resetActiveLog: () => null,
})

export const ActiveLogProvider = ({children})=>{
    const [activeLog, setActiveLog] = useState(defaultActiveLog);

    const getLogData = (logId, logList) => {
        const log = logList.find((log)=> log.id === logId);
        return log;
    }
    const resetActiveLog = () => {
        setActiveLog(defaultActiveLog);
    }
    const value = {activeLog, setActiveLog, getLogData, resetActiveLog};

    return(
        <ActiveLogContext.Provider value={value}>{children}</ActiveLogContext.Provider>
    )

}