import { useContext, useState, useEffect } from 'react';
import FilterContext from "../providers/FilterContext";

function Filters() {

    // For Date
    
    const [selectedDate, setSelectedDate] = useState('');

    const handleChangeDate = (event) => {
        setSelectedDate(event.target.value);
    };

    const { filter, setFilter } = useContext(FilterContext);

    const { dateOrderedInitial, setDateOrderedInitial } = useContext(FilterContext);
    const { dateOrderedFinal, setDateOrderedFinal } = useContext(FilterContext);

    const { dateDeliveredInitial, setDateDeliveredInitial } = useContext(FilterContext);
    const { dateDeliveredFinal, setDateDeliveredFinal } = useContext(FilterContext);
    const { searchProject, setSearchProject } = useContext(FilterContext);
    const { searchCompany, setSearchCompany } = useContext(FilterContext);
    const { searchOffice, setSearchOffice } = useContext(FilterContext);

    const [isFilterVisible, setFilterVisible] = useState(true);

    const toggleFilterVisibility = () =>{
        setFilterVisible(!isFilterVisible);
        const filterButtonValue = document.getElementById('filterButton')
        if (filterButtonValue.innerText == "Open Filter"){
            filterButtonValue.innerText="Close Filter"
            
        } else{
            filterButtonValue.innerText="Open Filter"
            filterButtonValue.className+='w-full'
        }
        
    };         
    const { resetCompanyType, setResetCompanyType } = useContext(FilterContext);
    const { resetCompanyName, setResetCompanyName } = useContext(FilterContext);
    const { resetProjectName, setResetProjectName } = useContext(FilterContext);
    const { resetOfficeName, setResetOfficeName } = useContext(FilterContext);

    useEffect(() => {
        if (resetCompanyType === 'inactive'){
            setFilter('Select')
            setResetCompanyType('Select')
        }

        if (resetCompanyName === 'inactive'){
            setSearchCompany('')
            setResetCompanyName('')
        }
        if (resetOfficeName === 'inactive'){
            setSearchOffice('')
            setResetOfficeName('')
        }
        if (resetProjectName === 'inactive'){
            setSearchProject('')
            setResetProjectName('')
        }


    }, [resetCompanyType, resetCompanyName, resetOfficeName, resetProjectName]);
    return (
        <>
            {/* Filter Options */}
            {isFilterVisible && (<div id="filterBar" className='flex flex-col pb-5 w-full shadow-custom-shadow bg-white justify-center items-center z-20'>
                <div className='flex flex-row w-full items-center justify-center bg-white'>
                    
                    <div className='flex flex-wrap flex-row w-full items-center justify-center'>
                        
                        {/* COmpany Private Or Public */}
                        <div className='flex flex-row w-[450px] items-center justify-center space-x-3 mt-4'>
                            <label className="md:block">Company:</label>
                            <select name="language" id="type" className='h-8 lg:w-6/12 sm:w-8/12 md:w-6/12 rounded-lg bg-light text-center' value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="Select" defaultChecked>Select</option>
                                <option value="Government">Government</option>
                                <option value="Private">Private</option>
                            </select>
                            
                        </div>
                        {/* <p ref={outputRefCompany} id="output">Selected type: None</p> */}

                        {/* Date */}
                        <div className='flex flex-wrap flex-row items-center justify-center align-middle w-[1000px] mt-4' >
                            <div className='flex flex-row w-6/12 items-center justify-center align-middle space-x-3 ml-2'>
                                <label className="hidden sm:block">Date Ordered:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={dateOrderedInitial} 
                                        className='bg-light rounded-lg h-8'
                                        onChange={(e) => setDateOrderedInitial(e.target.value)}
                                    />
                                    <label>{'>'}</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className='bg-light rounded-lg h-8'
                                        value={dateOrderedFinal} 
                                        onChange={(e) => setDateOrderedFinal(e.target.value)}
                                    />
                            </div>

                            <div className='flex flex-row items-center justify-center space-x-3 ml-2'>
                                <label className="hidden sm:block">Date Delivered:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        
                                        className='bg-light rounded-lg h-8'
                                        value={dateDeliveredInitial} 
                                        onChange={(e) => setDateDeliveredInitial(e.target.value)}
                                    /> 
                                    <label>{'>'}</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className='bg-light rounded-lg h-8'
                                        value={dateDeliveredFinal} 
                                        onChange={(e) => setDateDeliveredFinal(e.target.value)}
                                    /> 
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='flex w-11/12 justify-center items-center align-middle pt-8 mr-2 ml-2'>


                    <form className="w-72 mr-[15%]">   
                        <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input value={searchProject} onChange={(e) => setSearchProject(e.target.value)} type="search" id="default-search" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project" required />
                            {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </form>
                    <div className="w-72 mr-[15%]">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} type="search" id="default-search" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company" required />
                            {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </div>
                    <form className="w-72">   
                        <label for="default-search" className="mb-2 text-sm font-medium text-darkest sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-darkest" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input value={searchOffice} onChange={(e) => setSearchOffice(e.target.value)} type="search" id="default-search" className="block w-full h-4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg- focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-darkest dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Office" required />
                            {/* <button type="submit" class="text-darkest absolute end-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </form>

                </div>
            </div>)}

            {/* Filter Button */}
            <div className="flex items-center justify-center w-full">
                <div className='flex w-24 h-8 items-center justify-center bg-darkest text-white rounded-b-lg'>
                    <button id="filterButton" className="" onClick={toggleFilterVisibility}>Close Filter</button>
                </div>
            </div>
            
            
            
            
        
        </>
    );
}

export default Filters;