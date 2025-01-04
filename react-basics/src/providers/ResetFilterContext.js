import { createContext, useState } from "react";

const ResetFilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [resetCompanyType, setResetCompanyType] = useState("All"); // Default to "All"

    return (
        <ResetFilterContext.Provider value={{resetCompanyType, setResetCompanyType}}>
            {children}
        </ResetFilterContext.Provider>
    );
};

export default ResetFilterContext;