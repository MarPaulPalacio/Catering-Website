import { useContext, useState, useEffect } from 'react';
import FilterContext from "../providers/FilterContext";
import FileContext from "../providers/FileContext";
import PopupContext from '../providers/PopupProvider';
import writeFunction from "./SaveFunction"
import Popup from "./Popup"
import axios from 'axios';

// const { addProject, updateProject, deleteProject, getAllProjects } = require('../data/database');



function DatabaseTable() {

    // const [initialData, setInitialData] = useState([
    //     {
    //       PN: 1,
    //       projectName: "Birthday Expo",
    //       companyName: "Sample Name1",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-25"),
    //       dateOrderedNum: 1472083200000,
    //       cost: 203000,
    //       dateDelivered: new Date("2016-09-25"),
    //       dateDeliveredNum: 1474761600000,
    //       pdCost: 210000,
    //     },
    //     {
    //       PN: 2,
    //       projectName: "18th Birthday120",
    //       companyName: "Sample Names",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-26"),
    //       dateOrderedNum: 1472169600000,
    //       cost: 50000,
    //       dateDelivered: new Date("2016-09-26"),
    //       dateDeliveredNum: 1474848000000,
    //       pdCost: 52000,
    //     },
    //     {
    //       PN: 3,
    //       projectName: "Anniversary",
    //       companyName: "Sample Name2",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-27"),
    //       dateOrderedNum: 1472256000000,
    //       cost: 100011,
    //       dateDelivered: new Date("2016-09-27"),
    //       dateDeliveredNum: 1474934400000,
    //       pdCost: 102000,
    //     },
    //     {
    //       PN: 4,
    //       projectName: "Birthday Expo",
    //       companyName: "Sample Name3",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-28"),
    //       dateOrderedNum: 1472342400000,
    //       cost: 203000,
    //       dateDelivered: new Date("2016-09-28"),
    //       dateDeliveredNum: 1475020800000,
    //       pdCost: 215000,
    //     },
    //     {
    //       PN: 5,
    //       projectName: "18th Birthdays",
    //       companyName: "Sample Name4",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-29"),
    //       dateOrderedNum: 1472428800000,
    //       cost: 50000,
    //       dateDelivered: new Date("2016-09-29"),
    //       dateDeliveredNum: 1475107200000,
    //       pdCost: 51000,
    //     },
    //     {
    //       PN: 6,
    //       projectName: "Anniversary",
    //       companyName: "Sample Namef",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-30"),
    //       dateOrderedNum: 1472515200000,
    //       cost: 100011,
    //       dateDelivered: new Date("2016-09-30"),
    //       dateDeliveredNum: 1475193600000,
    //       pdCost: 101500,
    //     },
    //     {
    //       PN: 7,
    //       projectName: "Birthday Expo",
    //       companyName: "Sample Names",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-08-31"),
    //       dateOrderedNum: 1472601600000,
    //       cost: 203000,
    //       dateDelivered: new Date("2016-10-01"),
    //       dateDeliveredNum: 1475280000000,
    //       pdCost: 214000,
    //     },
    //     {
    //       PN: 8,
    //       projectName: "18th Birthday",
    //       companyName: "Sample Namej",
    //       officeName: "Office",
    //       modeOfProcurement: "",
    //       dateOrdered: new Date("2016-09-01"),
    //       dateOrderedNum: 1472688000000,
    //       cost: 50000,
    //       dateDelivered: new Date("2016-10-02"),
    //       dateDeliveredNum: 1475366400000,
    //       pdCost: 50500,
    //     },
    //   ]);
    const [initialData, setInitialData] = useState([
    ]);
    const [filteredData, setFilteredData] = useState([]); // State for filtered data
    const [data, setData] = useState([]);
    // setInitialData(getAllProjects())
    // getAllProjects()

    useEffect(() => {
        // Fetch data on component mount
        async function fetchData() {
          const projects = await getAllProjects(); // Wait for data from the backend
          setInitialData(projects); // Update the state with fetched projects
        }
    
        fetchData(); // Call the fetchData function
    }, []);

    useEffect(() => {
        // Whenever initialData is updated, set filteredData
        setFilteredData(initialData);

    }, [initialData]); // This effect runs every time initialData changes

    useEffect(() => {
        // Whenever initialData is updated, set filteredData
        setData(initialData);

    }, [initialData]); // This effect runs every time initialData changes

    async function getAllProjects() {
        try {
            const response = await axios.get('http://localhost:3001/projects');
            if (response.data && Array.isArray(response.data)) {
                const newData =  response.data.map((item) => {
                    return {
                      ...item, // Spread existing properties
                      dateOrdered: new Date(item.dateOrdered), // Format dateOrdered
                      dateDelivered: new Date(item.dateDelivered), // Format dateDelivered
                    };
                  });
                return newData; // Return an array of projects
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }
    
      
    // const [initialData, setInitialData] = useState([]);
  // Example data


    const { resetModeOfProcurement, setResetModeOfProcurement } = useContext(FilterContext);
    const { resetCompanyName, setResetCompanyName } = useContext(FilterContext);
    const { resetOfficeName, setResetOfficeName } = useContext(FilterContext);
    const { resetProjectName, setResetProjectName } = useContext(FilterContext);
    const {resetDateDelivered, setResetDateDelivered} = useContext(FilterContext); // Default to "All"
    const {resetDateOrdered, setResetDateOrdered} = useContext(FilterContext); // Default to "All"

    const { filter } = useContext(FilterContext); // Get the filter value
    const { searchProject } = useContext(FilterContext); // Get the searchProject value
    const { searchCompany } = useContext(FilterContext);
    const { searchOffice } = useContext(FilterContext);
    const { dateOrderedInitial } = useContext(FilterContext);
    const { dateOrderedFinal } = useContext(FilterContext);
    const { dateDeliveredInitial } = useContext(FilterContext);
    const { dateDeliveredFinal } = useContext(FilterContext);
    
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

    const { saveFile, setSaveFile } = useContext(FileContext);
    const { openFile, setOpenFile } = useContext(FileContext);


    const [isPopupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
    const [isEditVisible, setEditVisible] = useState(false); // State to manage popup visibility

    const {togglePopupOutside, setTogglePopupOutside} = useContext(PopupContext)
    const {initialDataOutside, setInitialDataOutside} = useContext(PopupContext) 
    const [entryType, setEntryType] = useState("")
    const [editId, setEditId] = useState("")
    const {resetData, setResetData} = useContext(PopupContext)

    useEffect (() =>{
        if (resetData === "True"){
            setResetData("False")
            setObjectEntry(" ")
        }
        if (togglePopupOutside ==="False"){
            setPopupVisible(!isPopupVisible);
            setTogglePopupOutside("True")
        }

        if (initialDataOutside){
            setInitialDataOutside("")
            setInitialData(initialDataOutside)
            setData(initialDataOutside)
            setPopupVisible(!isPopupVisible)
        }
    },[resetData, togglePopupOutside, initialDataOutside]);

    
    useEffect(() => {
        let sortedData = data


        if (openFile){
            // console.log("SDDS")
            setInitialData(openFile)
            setData(openFile)
            setFilteredData(openFile)
            // console.log("SDDSSD")
            setOpenFile("")
        }
        if (saveFile === "Saved"){
            // console.log("Function Entered Here")
            writeFunction(initialData)
            setSaveFile("Not Saved")
        }
        if (filter === "Select" || !filter) {
            const openMain = document.getElementById('comType')

            const openDiv = document.getElementById('comTypeDiv')
            setFilteredData(data); // Show all if "All" is selected or no filter is applied
            openMain.innerText = ' '
            openDiv.className +=(' hidden')
        } else if (filter === "Government" || filter === "Private") {
            sortedData = [...sortedData].filter(item => item.modeOfProcurement === filter)
            setFilteredData(sortedData);

            const openDiv = document.getElementById('comTypeDiv')
            const openMain = document.getElementById('comType')
            openDiv.classList.remove('hidden')
            openMain.innerText = filter
            
        } 

        if (searchProject){
            sortedData = [...sortedData].filter(item => item.projectName.toLowerCase().includes(searchProject.toLowerCase()))
            setFilteredData(sortedData);
            const openDiv = document.getElementById('projectNotifDiv')
            const openMain = document.getElementById('projectNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'PN : ' + searchProject
        } else {
            setFilteredData(sortedData);
            const openDiv = document.getElementById('projectNotifDiv')
            const openMain = document.getElementById('projectNotif')
            openDiv.className +=' hidden'
            openMain.innerText = 'PN : '
        }

        if (searchCompany){
            sortedData = [...sortedData].filter(item => item.companyName.toLowerCase().includes(searchCompany.toLowerCase()));
            setFilteredData(sortedData);
            const openDiv = document.getElementById('companyNotifDiv')
            const openMain = document.getElementById('companyNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'CN : ' + searchCompany
        }
        else {
            setFilteredData(sortedData);
            const openDiv = document.getElementById('companyNotifDiv')
            const openMain = document.getElementById('companyNotif')
            openDiv.className +=' hidden'
            openMain.innerText = 'CN : '
        }

        if (searchOffice){
            sortedData = [...sortedData].filter(item => item.officeName.toLowerCase().includes(searchOffice.toLowerCase()));
            setFilteredData(sortedData);
            const openDiv = document.getElementById('officeNotifDiv')
            const openMain = document.getElementById('officeNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'ON : ' + searchOffice
        }
        else {
            setFilteredData(sortedData);
            const openDiv = document.getElementById('officeNotifDiv')
            const openMain = document.getElementById('officeNotif')
            openDiv.className +=' hidden'
            openMain.innerText = 'ON : '
        }

        if (dateOrderedInitial && !dateOrderedFinal) {
            sortedData = [...sortedData].filter((item) => {
                if (isNaN(item.dateOrdered)) {
                    
                    return false; // Skip invalid date
                }
                
                const itemDate = item.dateOrdered.toISOString().split('T')[0]; // Replace "date" with your date field name
                return itemDate == dateOrderedInitial;
            });
            setFilteredData(sortedData);

            const openDiv = document.getElementById('dateOrderedNotifDiv')
            const openMain = document.getElementById('dateOrderedNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'DO : ' + dateOrderedInitial

        } else if (dateOrderedInitial && dateOrderedFinal) {
            sortedData = [...sortedData].filter((item) => {
                if (isNaN(item.dateOrdered)) {
                    return false;   
                }
                const itemDate = item.dateOrdered.toISOString().split('T')[0]; // Replace "date" with your date field name

                return itemDate >= dateOrderedInitial && itemDate <= dateOrderedFinal;
            });
            setFilteredData(sortedData);

            const openDiv = document.getElementById('dateOrderedNotifDiv')
            const openMain = document.getElementById('dateOrderedNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'DO : ' + dateOrderedInitial + " --> " + dateOrderedFinal
        } else {
            const openDiv = document.getElementById('dateOrderedNotifDiv')
            const openMain = document.getElementById('dateOrderedNotif')
            openDiv.className +=' hidden'
            setFilteredData(sortedData);
        }

        
        if (dateDeliveredInitial && !dateDeliveredFinal) {
            sortedData = [...sortedData].filter((item) => {
                if (isNaN(item.dateDelivered)) {
                    return false; 
                }
                const itemDate = item.dateDelivered.toISOString().split('T')[0]; // Replace "date" with your date field name
                return itemDate == dateDeliveredInitial;
            });
            setFilteredData(sortedData);

            const openDiv = document.getElementById('dateDeliveredNotifDiv')
            const openMain = document.getElementById('dateDeliveredNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'DO : ' + dateDeliveredInitial

        } else if (dateDeliveredInitial && dateDeliveredFinal) {
            sortedData = [...sortedData].filter((item) => {
                if (isNaN(item.dateDelivered)) {
                    return false; // Skip invalid date
                }
                const itemDate = item.dateDelivered.toISOString().split('T')[0]; // Replace "date" with your date field name

                return itemDate >= dateDeliveredInitial && itemDate <= dateDeliveredFinal;
            });
            setFilteredData(sortedData);

            const openDiv = document.getElementById('dateDeliveredNotifDiv')
            const openMain = document.getElementById('dateDeliveredNotif')
            openDiv.classList.remove('hidden')
            openMain.innerText = 'DO : ' + dateDeliveredInitial + " --> " + dateDeliveredFinal

        } else {
            const openDiv = document.getElementById('dateDeliveredNotifDiv')
            const openMain = document.getElementById('dateDeliveredNotif')
            openDiv.className +=' hidden'
            setFilteredData(sortedData);
        }

    }, [ openFile, saveFile, filter, data, searchProject, searchCompany, searchOffice, dateOrderedInitial, dateOrderedFinal, dateDeliveredInitial, dateDeliveredFinal]);    

    const sortData = (key) => {
        let sortedData = [...data];
        let direction = "ascending";
        // If already sorted by this key, toggle the direction
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        

        sortedData.sort((a, b) => {

            if (key === "dateOrdered" || key === "dateDelivered") {
                const dateA = new Date(a[key]);
                const dateB = new Date(b[key]);
                return direction === "ascending" ? dateA - dateB : dateB - dateA;
            }
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;

            return 0;
        });

        setSortConfig({ key, direction });
        setData(sortedData);
        setFilteredData(sortedData)
    };

    

    // Show or hide popup
    const togglePopupAdd = () => {
        setPopupVisible(!isPopupVisible);
        setEntryType("Add");
    };

    const toggleEdit = () => {
        const changeValueEditButton = document.getElementById("editIdButton")

        if (isEditVisible){
            changeValueEditButton.innerHTML = "Edit"
        } else {
            changeValueEditButton.innerHTML = "Go Back"
        }
        

        setEditVisible(!isEditVisible);
        // setEditId(id)
    };

    const [objectEntry, setObjectEntry] = useState("")
    const togglePopupEdit = (id, modeOfProcurement, companyName, officeName, projectName, cost, dateOrdered, dateDelivered, fixedaddPdCost, requestNumber, deliveredNumber) => {
        setPopupVisible(!isPopupVisible);
        setEntryType("Edit");
        setEditId(id)
        const newProjectEntry = new projectEntry(
            id, modeOfProcurement, 
            companyName, officeName, 
            projectName, cost, 
            dateOrdered.toLocaleDateString("en-CA"), dateDelivered.toLocaleDateString("en-CA"), fixedaddPdCost, requestNumber, deliveredNumber)
        setObjectEntry(newProjectEntry)
    }

    const modeOfProcurementNotifFilter = () => {
        const closeMain = document.getElementById('comType')
        const closeDiv = document.getElementById('comTypeDiv')
        closeMain.innerText = ' '
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetModeOfProcurement('inactive')
    }

    const projectNotifFilter = () => {
        const closeMain = document.getElementById('projectNotif')
        const closeDiv = document.getElementById('projectNotifDiv')
        closeMain.innerText = ' '
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetProjectName('inactive')
    }
    const companyNameNotifFilter = () => {
        const closeMain = document.getElementById('companyNotif')
        const closeDiv = document.getElementById('companyNotifDiv')
        closeMain.innerText = ' '
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetCompanyName('inactive')
    }
    const officeNotifFilter = () => {
        const closeMain = document.getElementById('officeNotif')
        const closeDiv = document.getElementById('officeNotifDiv')
        closeMain.innerText = ' '
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetOfficeName('inactive')
    }

    const dateOrderedNotifFilter = () => {
        const closeMain = document.getElementById('dateOrderedNotif')
        const closeDiv = document.getElementById('dateOrderedNotifDiv')
        closeMain.innerText = 'DO: '    
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetDateOrdered('inactive')
    }

    const dateDeliveredNotifFilter = () => {
        const closeMain = document.getElementById('dateDeliveredNotif')
        const closeDiv = document.getElementById('dateDeliveredNotifDiv')
        closeMain.innerText = ' '
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetDateDelivered('inactive')
    }

    class projectEntry {
        constructor(PN, modeOfProcurement, companyName, officeName, projectName, cost, dateOrdered, dateDelivered, fixedaddPdCost, addRequestNumber, addDeliveredNumber) {
            this.PN = PN;
            this.modeOfProcurement = modeOfProcurement;
            this.companyName = companyName;
            this.officeName = officeName;
            this.projectName = projectName;
            this.cost = cost;
            this.dateDelivered = dateDelivered;
            this.dateOrdered = dateOrdered;
            this.pdCost = fixedaddPdCost;
            this.dateDeliveredNum = addDeliveredNumber;
            this.dateOrderedNum = addRequestNumber;
        }
    } 
    
    // if (filteredData.length ===0){
    //     return(<>Hello</>)
    // }
    return (
    <>
        <div className="p-4 overflow-y-auto flex flex-col max-h-[920px]">


            {/* Filter Box with the add button */}
            <div className='flex flex-row align-middle items-center w-full mb-5 space-x-5'>
                <h1 className="text-2xl font-bold mb-4">Projects</h1>
                <div className='flex flex-row space-x-5 overflow-x-auto w-8/12 '>
                    <div id='comTypeDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='comType' className='text-md mx-auto text-darkest'></label>
                        <button id='comTypeButton' className='text-xl mr-5 text-dark' value ='active' onClick={modeOfProcurementNotifFilter}>x</button>
                    </div>

                    <div id='projectNotifDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='projectNotif' className='text-md mx-auto space-x-5 auto text-darkest'>PN : </label>
                        <button id='projectNotifExit' className='text-xl mr-5 text-dark' value ='active' onClick={projectNotifFilter}>x</button>
                    </div>

                    <div id='companyNotifDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='companyNotif' className='text-md mx-auto space-x-5 text-darkest'>CN : </label>
                        <button id='companyNotifExit' className='text-xl mr-5 text-dark' value ='active' onClick={companyNameNotifFilter}>x</button>
                    </div>

                    <div id='officeNotifDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='officeNotif' className='text-md mx-auto space-x-5 text-darkest'>CN : </label>
                        <button id='officeNotifExit' className='text-xl mr-5 text-dark' value ='active' onClick={officeNotifFilter}>x</button>
                    </div>

                    <div id='dateOrderedNotifDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='dateOrderedNotif' className='text-md mx-auto space-x-5 text-darkest'>DO : </label>
                        <button id='dateOrderedNotifExit' className='text-xl mr-5 text-dark' value ='active' onClick={dateOrderedNotifFilter}>x</button>
                    </div>
                    <div id='dateDeliveredNotifDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='dateDeliveredNotif' className='text-md mx-auto space-x-5 text-darkest'>DD : </label>
                        <button id='dateDeliveredExit' className='text-xl mr-5 text-dark' value ='active' onClick={dateDeliveredNotifFilter}>x</button>
                    </div>

                </div>
                
                <div className='flex flex-row align-middle items-center justify-end w-[23%]'>
                    <button onClick={togglePopupAdd} id="addIdButtonBig" className='hidden lg:block h-12 w-40 rounded-lg text-darkest mr-10 shadow-custom-shadow border border-darkest hover:bg-darkest hover:text-white'>Add New Project</button>
                    <button onClick={togglePopupAdd} id="addIdButtonSmall" className='block lg:hidden h-12 w-40 rounded-lg text-darkest mr-10 shadow-custom-shadow border border-darkest hover:bg-darkest hover:text-white'>Add</button>

                    <button onClick={toggleEdit} id="editIdButton"className='h-12 w-40 rounded-lg text-darkest mr-10 shadow-custom-shadow border border-darkest hover:bg-darkest hover:text-white'>Edit</button>
                </div>
            </div>


            {/* Body */}
            
            <div className="overflow-x-auto rounded-lg border border-darkest">
                <table className="table-auto border-collapse border border-dark w-full">
                    <thead className="sticky top-0 bg-gray-200 bg-darkest text-lightest mt-20">
                        <tr>
                            {isEditVisible && (
                            <th className="border border-dark px-4 py-2" rowSpan="2">
                                <button className="w-full h-full hover:underline">Edit</button>
                            </th>
                            )}
                            <th className="border border-dark px-4 py-2" rowSpan="2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("PN")}>PN</button>
                            </th>
                            <th className="border border-dark px-4 py-2" rowSpan="2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("projectName")}>Project Name</button>
                            </th>
                            <th className="border border-dark px-4 py-2" rowSpan="2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("companyName")}>Agency</button>
                            </th>
                            <th className="border border-dark px-4 py-2" rowSpan="2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("officeName")}>Department</button>
                            </th>
                            <th className="border border-dark px-4 py-2" rowSpan="2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("modeOfProcurement")}>Mode of Procurement</button>
                            </th>
                            <th className="border border-dark px-4 py-2" colSpan="3">Project Request</th>
                            <th className="border border-dark px-4 py-2" colSpan="3">Project Delivered</th>
                            
                        </tr>
                        <tr>
                            <th className="border border-dark px-4 py-2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("dateOrdered")}>Date</button>
                            </th>
                            <th className="border border-dark px-4 py-2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("cost")}>Cost</button>
                            </th>
                            <th className="border border-dark px-4 py-2">
                                <button className="w-full h-full hover:underline" onClick={() => sortData("cost")}>PR#</button>
                            </th>


                            <th className="border border-dark px-4 py-2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("dateDelivered")}>Date</button>
                            </th>
                            <th className="border border-dark px-4 py-2">
                            <button className="w-full h-full hover:underline" onClick={() => sortData("pdCost")}>Cost</button>
                            </th>
                            <th className="border border-dark px-4 py-2">
                                <button className="w-full h-full hover:underline" onClick={() => sortData("cost")}>PD#</button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="11" className="text-center">No data available</td>
                        </tr>
                    ) : (
                    
                    filteredData.map((item) => (
                        <tr key={item.PN} className="hover:bg-dark hover:text-white hover:shadow-custom-shadow">
                            
                            {isEditVisible &&
                            <td id={item.PN} onClick={() => togglePopupEdit(item.PN, item.modeOfProcurement, item.companyName, item.officeName, item.projectName, item.cost, item.dateOrdered, item.dateDelivered, item.pdCost, item.dateOrderedNum, item.dateDeliveredNum)} className="border bg-light text-darkest text-center border-darkest px-4 py-2 hover:bg-lightest hover:text-darkest hover:font-bold hover:shadow-custom-shadow hover:cursor-pointer">Edit</td>}
                            <td className="border border-darkest px-4 py-2">{item.PN}</td>
                            <td className="border border-darkest px-4 py-2">{item.projectName}</td>
                            <td className="border border-darkest px-4 py-2">{item.companyName}</td>
                            <td className="border border-darkest px-4 py-2">{item.officeName}</td>
                            <td className="border border-darkest px-4 py-2">{item.modeOfProcurement}</td>
                            <td className="border border-darkest px-4 py-2">
                                {isNaN(item.dateOrdered) ? ("None") :
                                (item.dateOrdered.toLocaleDateString("en-US"))}
                            </td>
                            <td className="border border-darkest px-4 py-2">₱{isNaN(item.cost) ? (0) : (new Intl.NumberFormat('en-US').format(item.cost))}</td>
                            <td className="border border-darkest px-4 py-2">{item.dateOrderedNum}</td>
                            
                            <td className="border border-darkest px-4 py-2">
                                {isNaN(item.dateDelivered) ? ("None") :
                                (item.dateDelivered.toLocaleDateString("en-US"))}
                            </td>
                            <td className="border border-darkest px-4 py-2">₱{isNaN(item.pdCost) ? (0) : (new Intl.NumberFormat('en-US').format(item.pdCost))}</td>
                            <td className="border border-darkest px-4 py-2">{item.dateDeliveredNum}</td>
                        </tr>
                    )))}
                    </tbody>
                </table>
            </div>
            <div className="box h-40 w-full"></div>

            {/* Popup */}
        </div>
        {isPopupVisible && ( // Render popup only if `isPopupVisible` is true
        <Popup datas={data} initialDatas={initialData} setType={entryType} id={editId} objectEntry={objectEntry}/>
      )}
    </>

  );
}

export default DatabaseTable;