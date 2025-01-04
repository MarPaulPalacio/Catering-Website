import { createContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState("Select"); // Default to "All"
    const [searchProject, setSearchProject] = useState(""); // Default to "All"
    const [searchCompany, setSearchCompany] = useState("");
    const [searchOffice, setSearchOffice] = useState("");
    const [dateOrderedInitial, setDateOrderedInitial] = useState("");
    const [dateOrderedFinal, setDateOrderedFinal] = useState("");
    const [dateDeliveredInitial, setDateDeliveredInitial] = useState("");
    const [dateDeliveredFinal, setDateDeliveredFinal] = useState("");

    const [resetCompanyType, setResetCompanyType] = useState("Select"); // Default to "All"
    const [resetCompanyName, setResetCompanyName] = useState(""); // Default to "All"
    const [resetOfficeName, setResetOfficeName] = useState(""); // Default to "All"
    const [resetProjectName, setResetProjectName] = useState(""); // Default to "All"
    const [resetDateDelivered, setResetDateDelivered] = useState(""); // Default to "All"
    const [resetDateOrdered, setResetDateOrdered] = useState(""); // Default to "All"

    return (
        <FilterContext.Provider value={{ resetDateOrdered, setResetDateOrdered, resetDateDelivered, setResetDateDelivered, resetProjectName, setResetProjectName, resetOfficeName, setResetOfficeName, resetCompanyName, setResetCompanyName, resetCompanyType, setResetCompanyType, filter, setFilter, searchProject, setSearchProject, searchCompany, setSearchCompany, searchOffice, setSearchOffice, dateOrderedInitial, setDateOrderedInitial, dateOrderedFinal, setDateOrderedFinal, dateDeliveredInitial, setDateDeliveredInitial, dateDeliveredFinal, setDateDeliveredFinal}}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;