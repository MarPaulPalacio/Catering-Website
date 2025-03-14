import React, {useEffect, useContext, useState} from 'react';
import FileContext from "../providers/FileContext";
import PopupContext from '../providers/PopupProvider';
import ExcelJS from "exceljs"
import axios from "axios"
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
            // setInitialDataOutside(finalData)
            // setDataOutside(finalData)
            setFinalData("")
            setIsPopupVisibleOutside("False")
            setTogglePopupOutside("False")
            setResetData("True")
        }
    });


    const togglePopup = (event) => {
        // event.preventDefault();
        setTogglePopupOutside("False")
        console.log("SDFSDDFSDSFDF")
        setResetData("True")
    };

    const deleteEntry = (event) =>{
        // event.preventDefault();
        // const updatedData = initialData.filter(item => item.PN !== id);
        setFinalData("Meron");
        console.log(id)
        const deleteProject = (projectId) => {
            axios.delete(`http://localhost:3001/projects/${projectId}`)
              .then(response => {
                console.log('Project deleted:', response.data.message);
                // You can handle further actions after deleting, like reloading data
              })
              .catch(error => {
                console.error('Error deleting project:', error.response ? error.response.data.error : error.message);
              });
        };
        deleteProject(id)
        setIsPopupVisibleOutside("False")
        setResetData("True")
        setTogglePopupOutside("False")
        window.location.reload();

    }

    const submitEntry = (event) =>{
        // event.preventDefault();
        
        const governmentRadio = document.getElementById('governmentRadio')
        const privateRadio = document.getElementById('privateRadio')
        const addCompanyName = document.getElementById('addCompanyName')
        const addOfficeName = document.getElementById('addOfficeName')
        const addProjectName = document.getElementById('addProjectName')
        const fixedaddCost = document.getElementById('addCost')
        const fixedaddPdCost = document.getElementById('addPdCost')
        const addDateOrdered = document.getElementById('addDateOrdered')
        const addModeOfProcurement = document.getElementById('addModeOfProcurement')
        const addRequestNumber = document.getElementById('addRequestNumber')
        const addDeliveredNumber = document.getElementById('addDeliveredNumber')
        const addDateDelivered = document.getElementById('addDateDelivered')

    
        


        async function addProject(newProject) {
            try {
                const response = await axios.post('http://localhost:3001/projects', newProject);
                console.log('Project added successfully:', response.data);
            } catch (error) {
                console.error('Error adding project:', error);
            }
        }

        let dateOrderedNullOrNot = "";
        let dateDeliveredNullOrNot = "";
        if (addDateOrdered.value === ""){
            // console.log("I WON")
            dateOrderedNullOrNot = "";
            
        } else {
            dateOrderedNullOrNot = new Date(addDateOrdered.value);
            
        }
        
        if (addDateDelivered.value===""){
            // console.log("I WON")
            dateDeliveredNullOrNot = "";
            
        } else {
            dateDeliveredNullOrNot = new Date(addDateDelivered.value);
            
        }
        if (setType==="Add"){
            console.log(addDateOrdered.value)
            
            // console.log(dateDeliveredNullOrNot)
            const newProject = {
                projectName: addProjectName.value,
                companyName: addCompanyName.value,
                officeName: addOfficeName.value,
                modeOfProcurement: addModeOfProcurement.value,
                dateOrdered: dateOrderedNullOrNot,
                dateOrderedNum: addRequestNumber.value,
                cost: fixedaddCost.value,
                dateDelivered: dateDeliveredNullOrNot,
                dateDeliveredNum: addDeliveredNumber.value,
                pdCost: fixedaddPdCost.value,
            };
            addProject(newProject)
            setFinalData("Meron"); // Use spread operator to add the object
            setIsPopupVisibleOutside("False");
            window.location.reload();
        } else if (setType==="Edit") {
            const updateProject = async (id, projectData) => {
                try {
                  const response = await axios.put(`http://localhost:3001/projects/${id}`, projectData);
                  console.log('Project updated:', response.data);
                } catch (error) {
                  console.error('Error updating project:', error.response?.data || error.message);
                }
            };

            const modifyItem = (id) => {
                
                const updateEntry = {
                        companyName: addCompanyName.value, 
                        officeName: addOfficeName.value, 
                        projectName: addProjectName.value, 
                        cost: fixedaddCost.value, 
                        dateOrdered: dateOrderedNullOrNot, 
                        dateDelivered: dateDeliveredNullOrNot,
                        pdCost: fixedaddPdCost.value,
                        dateDeliveredNum: addDeliveredNumber.value,
                        dateOrderedNum: addRequestNumber.value,
                        modeOfProcurement:addModeOfProcurement.value
                };
                updateProject(id, updateEntry)
                setFinalData("Meron")
                setIsPopupVisibleOutside("False");
            }
            modifyItem(id)
            setResetData("True")
            setIsPopupVisibleOutside("False");
            window.location.reload();
        }
        
    };

    const costEntryLimiter = () => {
        let costLimiter = document.getElementById('addCost');
        costLimiter.value = costLimiter.value.replace(/[^0-9]/g, '');
    };

    return (
        <>
        <div
            className="fixed inset-0 bg-[#000000] bg-opacity-70 flex justify-center items-center z-50"
            onClick={togglePopup} // Hide popup if clicked outside
            >
                <div className="overflow-y-auto bg-white p-5 rounded-2xl shadow-lg sm:w-[50%] sm:h-[90%] shadow-custom-shadow border flex flex-col border-darkest align-middle w-full h-full" onClick={(e) => e.stopPropagation()}>
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
                            <p className="text-xl font-bold mb-4">Agency</p>

                            <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addCompanyName" defaultValue={objectEntry.companyName} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>

                            <br/>
                            <p id='officeHeader' className="text-xl font-bold mb-4 ">Department</p>

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
                            <p className="text-xl font-bold mb-4 ">Mode of Procurement</p>

                            <div className="relative ">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addModeOfProcurement" defaultValue={objectEntry.modeOfProcurement} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Office Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>

                            <br/>
                            <p className="text-xl font-bold mb-4">Request Cost</p>

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
                            <p className="text-xl font-bold mb-4 ">Project Request Number</p>

                            <div id='officeEntry' className="relative ">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addRequestNumber" defaultValue={objectEntry.dateOrderedNum} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Office Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>



                            <br/>

                            <p className="text-xl font-bold mb-4">Delivered Cost</p>
                            <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Enter Cost</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addPdCost" defaultValue={objectEntry.cost} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Cost Here" onChange={costEntryLimiter} required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>

                            <br/>
                            <p className="text-xl font-bold mb-4 ">Project Delivered Number</p>

                            <div className="relative ">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="addDeliveredNumber" defaultValue={objectEntry.dateDeliveredNum} className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Office Name Here" required />
                                {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                            </div>
                            

                        
                            
                            <br/>
                            <div className='flex flex-wrap flex-row justify-center align-middle'>
                                <div className='flex flex-row mt-4 md:w-[50%] lg:w-[50%] sm:w-6/12 items-center justify-center align-middle'>
                                        <label className="block pr-5">Date Requested:</label>
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

                            <div className='flex flex-row w-full items-center align-bottom justify-center space-x-10 mt-5'>
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
