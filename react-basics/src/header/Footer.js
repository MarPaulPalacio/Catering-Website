import React, {useEffect, useContext, useState} from 'react';
import FileContext from "../providers/FileContext";
import ExcelJS from "exceljs"
import axios from "axios"

function FooterMain() {

  const { saveFile, setSaveFile } = useContext(FileContext);

  const { openFile, setOpenFile } = useContext(FileContext);
  
  const [file, setFile] = useState(null);
  // const [data, setData] = useState([]);

  const saveFileFunction = () => {
    setSaveFile("Saved")
  }

  const openFileTrigger = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';  // Set input type to file
    fileInput.accept = '.xlsx,.xls,.csv'; // Optional: Restrict file types

    fileInput.addEventListener('change', async (event) => {
      try {
        const data = await handleFileInput(event);
        setOpenFile(data); // After handleFileInput finishes, set the data
      } catch (error) {
        console.error("Error handling file:", error);
      }
    });
    // Listen for the file selection event
    // 
    // Trigger the file dialog
    fileInput.click();
  }

  const handleFileInput = async (event) => {
    console.log("HANDLE FILE INPUT")

    
    console.log(event)
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      return await handleFileOpen(selectedFile);
    }
    return []
  };
  const deleteAllProject = () => {
    return axios.delete(`http://localhost:3001/projects`)
      .then(response => {
        console.log('All projects deleted:', response.data.message);
        // You can handle further actions after deleting, like reloading data or adding projects
      })
      .catch(error => {
        console.error('Error deleting project:', error.response ? error.response.data.error : error.message);
      });
  };
  const addAllProjects = async (projects) => {
    try {
      const response = await axios.post('http://localhost:3001/projects/all', projects);
      console.log('Response:', response.data);
      console.log(projects)
    } catch (error) {
      console.error('Error adding projects:', error.response ? error.response.data.error : error.message);
    }
  };

  const handleFileOpen = async (selectedFile) => {
    const reader = new FileReader();
    const rows = [];
    let copyRows = [];
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        
        try {
          // Load the file
          await workbook.xlsx.load(buffer);
  
          // Assume the first sheet is the one we want
          const sheet = workbook.getWorksheet(1);
          
  
          // Iterate through rows and extract values
          let num=1;
          sheet.eachRow((row, rowIndex) => {
            // console.log("FOUND ITs")
            
            if (rowIndex > 1) { // Skip header row
              const dateDeliveredNullOrNot = isNaN(new Date(row.getCell(9).value)) ? "null": new Date(row.getCell(9).value);
              const dateOrderedNullOrNot = isNaN(new Date(row.getCell(6).value)) ? "null": new Date(row.getCell(6).value);
              const rowData = {
                PN: num,
                projectName: row.getCell(2).value,
                companyName: row.getCell(3).value,
                officeName: row.getCell(4).value,
                modeOfProcurement: row.getCell(5).value,
                
                dateOrdered: dateOrderedNullOrNot,
                // dateOrdered: new Date(row.getCell(6).value),
                dateOrderedNum: row.getCell(7).value,
                cost: parseFloat(row.getCell(8).value),

                dateDelivered: dateDeliveredNullOrNot,
                // dateDelivered: new Date(row.getCell(9).value),
                dateDeliveredNum: row.getCell(10).value,
                pdCost: parseFloat(row.getCell(11).value),
              };
              num+=1
              // console.log(rowData)
              rows.push(rowData);
            }
          });
          num = 0;
          
          copyRows = [...rows]
          console.log("Rows below")
          console.log(copyRows)
          deleteAllProject()
          .then(() => {
            // Once deleteAllProject is done, proceed with adding the new projects
            addAllProjects(copyRows);
          })
          .catch((error) => {
            console.error("Error occurred:", error);
          });
          resolve(rows); // Resolve the promise with the extracted data
        } catch (error) {
          reject(error); // Reject the promise if any error occurs
        }
      };
  
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(selectedFile);
      
      // console.log(copyRows)
      
    });
  };

  return (
    <>
      <div className='fixed bottom-0 flex w-full h-20 items-center justify-center'>
        <div className='flex w-11/12 h-12 xl:space-x-96 lg:space-x-64 md:space-x-32 sm:space-x-20 space-x-16 justify-center items-center rounded-lg'>
          <button onClick={openFileTrigger} class=" text-darkest border border-darkest hover:text-[#ffffe4] hover:bg-dark hover:underline active:text-white active:underline text-2xl w-6/12 bg-[#f5f5f5] shadow-custom-shadow rounded-xl h-10">Open File</button>
          <button onClick = {saveFileFunction} class=" text-darkest border border-darkest hover:text-[#ffffe4] hover:bg-dark hover:underline active:text-white active:underline text-2xl w-6/12 bg-[#f5f5f5] shadow-custom-shadow rounded-xl h-10">Save File</button>
        </div>
      </div>
      
    </>
    
  );
}

export default FooterMain;
