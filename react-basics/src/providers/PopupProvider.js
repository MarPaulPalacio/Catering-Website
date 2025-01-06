import { createContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isPopupVisibleOutside, setIsPopupVisibleOutside] = useState("Select");
    const [togglePopupOutside, setTogglePopupOutside] = useState(null);
    const [dataOutside, setDataOutside] = useState(null);
    const [initialDataOutside, setInitialDataOutside] = useState(null);
    const [resetData, setResetData] = useState("False");
    return (
        <PopupContext.Provider value={{resetData, setResetData, initialDataOutside, setInitialDataOutside, dataOutside, setDataOutside, isPopupVisibleOutside, setIsPopupVisibleOutside, togglePopupOutside, setTogglePopupOutside}}>
            {children}
        </PopupContext.Provider>
    );
}

export default PopupContext;