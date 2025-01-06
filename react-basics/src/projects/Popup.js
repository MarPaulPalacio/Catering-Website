import React, {useEffect, useContext, useState} from 'react';
import FileContext from "../providers/FileContext";
import PopupContext from '../providers/PopupProvider';
import ExcelJS from "exceljs"

function Popup({datas, initialDatas, setType, id, objectEntry}) {

    const initialData = initialDatas;
  // Example data
    const [selectedOption, setSelectedOption] = useState(null);

    const [finalData, setFinalData] = useState(null)
    
    const {togglePopupOutside, setTogglePopupOutside} = useContext(PopupContext)
    const {initialDataOutside, setInitialDataOutside} = useContext(PopupContext)
    const {DataOutside, setDataOutside} = useContext(PopupContext)
    const {resetData, setResetData} = useContext(PopupContext)
    const {isPopupVisibleOutside, setIsPopupVisibleOutside} = useContext(PopupContext)

    useEffect(() => {
        if (finalData){
            setInitialDataOutside(finalData)
            setDataOutside(finalData)
            setFinalData("")
        }
    });


    const togglePopup = (event) => {
        event.preventDefault();
        setTogglePopupOutside("False")
        console.log("SDFSDDFSDSFDF")
        setResetData("True")
    };

    const deleteEntry = (event) =>{
        event.preventDefault();
        const updatedData = initialData.filter(item => item.PN !== id);
        setFinalData(updatedData);
        setInitialDataOutside(updatedData)
        setDataOutside(updatedData)
        setFinalData(updatedData)
        setIsPopupVisibleOutside("False")
        setResetData("True")

    }

    const submitEntry = (event) =>{
        event.preventDefault();
        
        const governmentRadio = document.getElementById('governmentRadio')
        const privateRadio = document.getElementById('privateRadio')
        const addCompanyName = document.getElementById('addCompanyName')
        const addOfficeName = document.getElementById('addOfficeName')
        const addProjectName = document.getElementById('addProjectName')
        const fixedaddCost = document.getElementById('addCost')
        const addDateOrdered = document.getElementById('addDateOrdered')
        const addDateDelivered = document.getElementById('addDateDelivered')

    
        

        class projectEntry {
            constructor(PN, companyType, companyName, officeName, projectName, cost, dateOrdered, dateDelivered) {
                this.PN = PN;
                this.companyType = companyType;
                this.companyName = companyName;
                this.officeName = officeName;
                this.projectName = projectName;
                this.cost = cost;
                this.dateDelivered = dateDelivered;
                this.dateOrdered = dateOrdered;

            }
        } 
        
        let companyType = '';
        let officeName='';
        if (governmentRadio.checked){
            companyType =  'Government'
            officeName= addOfficeName.value
        } else if (privateRadio.checked){
            companyType = 'Private'
        }
        
        if (
            !companyType || // Ensure radio button is selected
            !addCompanyName.value.trim() || 
            (companyType === 'Government' && !addOfficeName.value.trim()) || // Office name is required for Government type
            !addProjectName.value.trim() || 
            !fixedaddCost.value.trim() || 
            !addDateOrdered.value.trim() || 
            !addDateDelivered.value.trim()
        ) {
            alert("Please fill in all the required fields.");
            return
             
        }


        if (setType==="Add"){
            const newProjectEntry = new projectEntry(
            initialData.length + 1, companyType, 
            addCompanyName.value, addOfficeName.value, 
            addProjectName.value, fixedaddCost.value, 
            new Date(addDateOrdered.value), new Date(addDateDelivered.value))
            // console.log(new Date(addDateOrdered.value))
            setFinalData([...initialData, newProjectEntry]); // Use spread operator to add the object
            setIsPopupVisibleOutside("False");
        } else if (setType==="Edit") {


            const modifyItem = (id) => {
                const updateEntry = initialData.map(item => 
                    item.PN === id ? {
                        ...item, 
                        companyType: companyType, 
                        companyName: addCompanyName.value, 
                        officeName: addOfficeName.value, 
                        projectName: addProjectName.value, 
                        cost: fixedaddCost.value, 
                        dateOrdered: new Date(addDateOrdered.value), 
                        dateDelivered: new Date(addDateDelivered.value)
                        
                        } : item
                );
                setFinalData(updateEntry)
                setIsPopupVisibleOutside("False");
            }
            
            modifyItem(id)
            setResetData("True")
            // setFinalData([...initialData, newProjectEntry]); // Use spread operator to add the object
            
        }
        
    };

    const costEntryLimiter = () => {
        let costLimiter = document.getElementById('addCost');
        costLimiter.value = costLimiter.value.replace(/[^0-9]/g, '');
    };

    const handleRadioChange = (e) => {
        const officeValue = document.getElementById('officeHeader')
        const officeEntry = document.getElementById('officeEntry')
        if (e.target.value =="government"){

            officeEntry.classList.remove('hidden')
            officeValue.classList.remove('hidden')
        } else  if (e.target.value =="private"){

            officeEntry.className+=' hidden'
            officeValue.className +=' hidden'
        }
        setSelectedOption(e.target.value); // Update the selected value
    };

    return (
        <>
        <div
            className="fixed inset-0 bg-[#000000] bg-opacity-70 flex justify-center items-center z-50"
            onClick={togglePopup} // Hide popup if clicked outside
            >
                <div className="overflow-y-auto bg-white p-5 rounded-2xl shadow-lg sm:w-[50%] sm:h-[90%] shadow-custom-shadow border flex flex-col border-darkest align-middle justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <div className='flex flex-row w-[100%] h-10 align-middle justify-center items-center bg-darkest mb-10'>
                            {setType==="Add" &&
                            (<><h1 className=" text-2xl font-bold text-lightest">Add Project</h1><br /><br /></>

                            )}

                            {setType==="Edit" &&
                            (<><h1 className=" text-2xl font-bold text-lightest">Edit Project</h1><br /><br /></>

                            )}
                            
                        </div>
                        
                        <form id="color" className ='flex-grow flex flex-col justify-between'>
                            {setType==="Edit" &&
                            (<><p className="text-xl font-bold mb-4">ID: {id}</p><br /></>

                            )}
                            <p className="text-xl font-bold mb-4">Company Type</p>
                            <div>
                            <label className='text-xl'>
                                <input type="radio" name="company" value="government" id='governmentRadio' onChange={handleRadioChange} defaultChecked/> Government
                            </label>
                            <br/>
                            <label className='text-xl'>
                                <input type="radio" name="company" value="private" id='privateRadio' onChange={handleRadioChange}/> Private
                            </label>
                            </div>
                            
                            <br/>
                        
                            <p className="text-xl font-bold mb-4">Company Name</p>

                            <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addCompanyName" defaultValue={objectEntry.companyName}className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>

                            <br/>
                            <p id='officeHeader' className="text-xl font-bold mb-4 ">Office Name</p>

                            <div id='officeEntry' className="relative ">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addOfficeName" defaultValue={objectEntry.officeName} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Office Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>

                            <br/>
                            <p className="text-xl font-bold mb-4">Project Name</p>

                            <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Search Project Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addProjectName" defaultValue={objectEntry.projectName} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Project Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>

                            <br/>
                            <p className="text-xl font-bold mb-4">Cost</p>

                            <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Enter Cost</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addCost" defaultValue={objectEntry.cost} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Cost Here" onChange={costEntryLimiter} required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>
                            

                        
                            
                            <br/>
                            <div className='flex flex-wrap flex-row justify-center align-middle'>
                                <div className='flex flex-row mt-4 md:w-[50%] lg:w-[50%] sm:w-6/12 items-center justify-center align-middle'>
                                        <label className="block pr-5">Date Ordered:</label>
                                            <input
                                                type="date"
                                                id='addDateOrdered' 
                                                defaultValue={objectEntry.dateOrdered}
                                                className='bg-light rounded-lg h-8'
                                                required
                                            /> 
                                </div>
                                <div className=' flex flex-row mt-4 md:w-auto items-center justify-center align-middle'>
                                        <label  className="block pr-5">Date Delivered:</label>
                                            <input
                                                type="date"
                                                id='addDateDelivered'
                                                
                                                defaultValue={objectEntry.dateDelivered}
                                                className='bg-light rounded-lg h-8'
                                                required
                                            /> 
                                </div>
                            </div>

                            <div className='flex flex-row w-full items-center align-bottom justify-center space-x-40 mt-5'>
                                <button className="bg-red-500 text-lightest px-4 py-2 rounded-lg bg-darkest" onClick={togglePopup}>
                                    Close
                                </button>

                                <button type='submit' className="bg-red-500 text-lightest px-4 py-2 rounded-lg bg-darkest" onClick={submitEntry}>
                                    Submit
                                </button>

                                {setType==="Edit" &&
                                (<>
                                <button className="bg-red-500 text-lightest px-4 py-2 rounded-lg bg-darkest" onClick={deleteEntry}>
                                    Delete
                                </button>
                                </>)}
                            </div>
                            
                        </form>
                        
                </div>
                {/* <div className='fixed flex bg-darkest w-[100%] h-[100%] items-center justify-center opacity-50'>
                </div> */}
            </div>
        
        </>
        
    );
}

export default Popup;
