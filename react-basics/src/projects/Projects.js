import { useContext, useState, useEffect } from 'react';
import FilterContext from "../providers/FilterContext";
import FileContext from "../providers/FileContext";
import writeFunction from "./SaveFunction"


function DatabaseTable() {

    const [initialData, setInitialData] = useState([
        { PN: 1, companyType: "Private", companyName:"Sample Name1", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 2, companyType: "Government", companyName:"Sample Names", officeName: "Office", projectName: "18th Birthday120", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 3, companyType: "Private", companyName:"Sample Name2", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 4, companyType: "Private", companyName:"Sample Name3", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 5, companyType: "Government", companyName:"Sample Name4", officeName: "Office", projectName: "18th Birthdays", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 6, companyType: "Private", companyName:"Sample Namef", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 7, companyType: "Private", companyName:"Sample Names", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 8, companyType: "Government", companyName:"Sample Namej", officeName: "Office", projectName: "18th Birthday", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 9, companyType: "Private", companyName:"Sample Namel", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 10, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 11, companyType: "Government", companyName:"Sample Name", officeName: "Office", projectName: "18th Birthday", cost: 50050, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2017-09-25")},
        { PN: 12, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 13, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-26")},
        { PN: 14, companyType: "Government", companyName:"Sample Name", officeName: "Office", projectName: "18th Birthday", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 15, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 16, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 17, companyType: "Government", companyName:"Sample Name", officeName: "Office", projectName: "18th Birthday", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 18, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 19, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2015-09-25")},
        { PN: 20, companyType: "Government", companyName:"Sample Name", officeName: "Office", projectName: "18th Birthday", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 21, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 22, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Birthday Expo", cost: 203000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 23, companyType: "Government", companyName:"Sample Name", officeName: "Office", projectName: "18th Birthday", cost: 50000, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
        { PN: 24, companyType: "Private", companyName:"Sample Name", officeName: "Office", projectName: "Anniversary", cost: 100011, dateOrdered:new Date("2016-08-25"), dateDelivered:new Date("2016-09-25")},
    ]);
  // Example data
    const [data, setData] = useState(initialData);


    const { resetCompanyType, setResetCompanyType } = useContext(FilterContext);
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
    const [filteredData,     setFilteredData] = useState(initialData); // State for filtered data
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

    const { saveFile, setSaveFile } = useContext(FileContext);
    
    
    useEffect(() => {
        let sortedData = data

        if (saveFile === "Saved"){
            // console.log("Function Entered Here")
            writeFunction(data)
            setSaveFile("Not Saved")
        }
        if (filter === "Select" || !filter) {
            const openMain = document.getElementById('comType')

            const openDiv = document.getElementById('comTypeDiv')
            setFilteredData(data); // Show all if "All" is selected or no filter is applied
            openMain.innerText = ' '
            openDiv.className +=(' hidden')
        } else if (filter === "Government" || filter === "Private") {
            sortedData = [...sortedData].filter(item => item.companyType === filter)
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

    }, [ saveFile, filter, data, searchProject, searchCompany, searchOffice, dateOrderedInitial, dateOrderedFinal, dateDeliveredInitial, dateDeliveredFinal]);    

    const [selectedOption, setSelectedOption] = useState(null);

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
    };

    const [isPopupVisible, setPopupVisible] = useState(false); // State to manage popup visibility

    // Show or hide popup
    const togglePopup = () => {
      setPopupVisible(!isPopupVisible);
    };

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

        const newProjectEntry = new projectEntry(
            initialData.length + 1, companyType, 
            addCompanyName.value, addOfficeName.value, 
            addProjectName.value, fixedaddCost.value, 
            new Date(addDateOrdered.value), new Date(addDateDelivered.value))
        // console.log(new Date(addDateOrdered.value))
        setInitialData([...initialData, newProjectEntry]); // Use spread operator to add the object
        setData([...initialData, newProjectEntry]);
        setPopupVisible(!isPopupVisible);
    };
    const costEntryLimiter = () => {
        let costLimiter = document.getElementById('addCost');
        costLimiter.value = costLimiter.value.replace(/[^0-9]/g, '');
    };

    const companyTypeNotifFilter = () => {
        const closeMain = document.getElementById('comType')
        const closeDiv = document.getElementById('comTypeDiv')
        closeMain.innerText = ' '
        closeDiv.className +=(' hidden')
        setFilteredData(data);
        setResetCompanyType('inactive')
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
        // console.log(closeMain)
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

    const saveData = () => {
        writeFunction(initialData)
    }
    return (
    <>
        <div className="p-4 overflow-y-auto flex flex-col max-h-[920px]">
            <div className='flex flex-row align-middle items-center w-full mb-5 space-x-5'>
                <h1 className="text-2xl font-bold mb-4">Projects</h1>
                <div className='flex flex-row space-x-5 overflow-x-auto w-8/12 '>
                    <div id='comTypeDiv' className='flex flex-row hidden shadow-custom-shadow rounded-lg bg-white h-11 mb-4 w-80 min-w-40 items-center justify-between align-middle'>
                        <label id='comType' className='text-md mx-auto text-darkest'></label>
                        <button id='comTypeButton' className='text-xl mr-5 text-dark' value ='active' onClick={companyTypeNotifFilter}>x</button>
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
                    <button onClick={togglePopup} className='hidden md:block h-10 w-40 rounded-lg text-darkest mr-10 shadow-custom-shadow border border-darkest hover:bg-darkest hover:text-white'>Add New Project</button>
                    <button onClick={togglePopup} className='block md:hidden h-10 w-40 rounded-lg text-darkest mr-10 shadow-custom-shadow border border-darkest hover:bg-darkest hover:text-white'>Add</button>
                </div>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-darkest">
                <table className="table-auto border-collapse border border-dark w-full">
                    <thead className="sticky top-0 bg-gray-200 bg-darkest text-lightest mt-20">
                        <tr className="">
                            <th className="border border-dark px-4 py-2 hidden"><button className="w-full h-full hover:underline">Edit</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline" onClick={() => sortData("PN")}>PN</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("companyType")}>Company Type</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("companyName")}>Company Name</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("officeName")}>Office Name</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("projectName")}>Project Name</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("cost")}>Cost</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("dateOrdered")}>Product Ordered</button></th>
                            <th className="border border-dark px-4 py-2"><button className="w-full h-full hover:underline"onClick={() => sortData("dateDelivered")}>Product Delivered</button></th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.PN} className="hover:bg-gray-100">
                            <td id={item.PN} className="border border-darkest px-4 py-2 hidden">{item.PN}</td>
                            <td className="border border-darkest px-4 py-2">{item.PN}</td>
                            <td className="border border-darkest px-4 py-2">{item.companyType}</td>
                            <td className="border border-darkest px-4 py-2">{item.companyName}</td>
                            <td className="border border-darkest px-4 py-2">{item.officeName}</td>
                            <td className="border border-darkest px-4 py-2">{item.projectName}</td>
                            <td className="border border-darkest px-4 py-2">₱{item.cost}</td>
                            
                            <td className="border border-darkest px-4 py-2">
                                {item.dateOrdered.toLocaleDateString("en-US")}
                            </td>
                            <td className="border border-darkest px-4 py-2">
                                {item.dateDelivered.toLocaleDateString("en-US")}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="box h-40 w-full"></div>

        </div>
        {isPopupVisible && ( // Render popup only if `isPopupVisible` is true
        <div
          className="fixed inset-0 bg-[#000000] bg-opacity-70 flex justify-center items-center z-50"
          onClick={togglePopup} // Hide popup if clicked outside

        >
            <div className="overflow-y-auto bg-white p-5 rounded-2xl shadow-lg sm:w-[50%] sm:h-[90%] shadow-custom-shadow border flex flex-col border-darkest align-middle justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
                    <div className='flex flex-row w-[100%] h-10 align-middle justify-center items-center bg-darkest mb-10'>
                        <h1 className=" text-2xl font-bold text-lightest">Add Project</h1><br/><br/>
                        
                    </div>
                    
                    <form id="color" className ='flex-grow flex flex-col justify-between'>

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
                            <input type="search" id="addCompanyName" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Name Here" required />
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
                            <input type="search" id="addOfficeName" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Office Name Here" required />
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
                            <input type="search" id="addProjectName" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Project Name Here" required />
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
                            <input type="search" id="addCost" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Cost Here" onChange={costEntryLimiter} required />
                            {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                        

                       
                        
                        <br/>
                        <div className='flex flex-wrap flex-row justify-center align-middle'>
                            <div className='flex flex-row mt-4 md:w-[50%] lg:w-[50%] sm:w-6/12 items-center justify-center align-middle'>
                                    <label className="block pr-5">Date Ordered:</label>
                                        <input
                                            type="date"
                                            id='addDateOrdered' 
                                            
                                            className='bg-light rounded-lg h-8'
                                            required
                                        /> 
                            </div>
                            <div className=' flex flex-row mt-4 md:w-auto items-center justify-center align-middle'>
                                    <label  className="block pr-5">Date Delivered:</label>
                                        <input
                                            type="date"
                                            id='addDateDelivered'
                                            
                                            
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
                        </div>
                        
                    </form>
                    
            </div>
            {/* <div className='fixed flex bg-darkest w-[100%] h-[100%] items-center justify-center opacity-50'>
            </div> */}
        </div>
      )}
    </>

  );
}

export default DatabaseTable;