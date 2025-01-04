import { createContext, useState } from "react";

const ResetFilterContext = createContext();

export const FileProvider = ({ children }) => {
    const [saveFile, setSaveFile] = useState("Not Saved"); // Default to "All"

    return (
        <ResetFilterContext.Provider value={{saveFile, setSaveFile}}>
            {children}
        </ResetFilterContext.Provider>
    );
};

export default ResetFilterContext;