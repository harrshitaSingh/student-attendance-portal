import { createContext, useState } from "react";
import dummyStudentData from "../../Config/StudentDataConfig/config.json";


export const StudentDataContext = createContext()

const StudentDataProvider = ({ children }) => {
    const [studentContextData, setStudentContextData] = useState(dummyStudentData)



    return (
        <StudentDataContext.Provider value={{ studentContextData, setStudentContextData }}>
            {children}
        </StudentDataContext.Provider>
    )
}

export default StudentDataProvider