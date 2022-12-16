import { createContext, useState } from "react";

export const ActiveLogContext = createContext({
    activeLog: "", 
    setActiveLog: () => null,
})

export const ActiveLogProvider = ({children})=>{
    const [activeLog, setActiveLog] = useState("");

    const value = {activeLog, setActiveLog};
    
    return(
        <ActiveLogContext.Provider value={value}>{children}</ActiveLogContext.Provider>
    )

}