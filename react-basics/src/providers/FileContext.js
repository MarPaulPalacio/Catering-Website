import { createContext, useState } from "react";

const ResetFileContext = createContext();

export const FileProvider = ({ children }) => {
    const [saveFile, setSaveFile] = useState("Not Saved"); 
    const [openFile, setOpenFile] = useState("");
    return (
        <ResetFileContext.Provider value={{saveFile, setSaveFile, openFile, setOpenFile}}>
            {children}
        </ResetFileContext.Provider>
    );
};

export default ResetFileContext;