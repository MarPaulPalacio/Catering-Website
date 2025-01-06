import React, {useEffect, useContext, useState} from 'react';
import FileContext from "../providers/FileContext";
import ExcelJS from "exceljs"

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

  const handleFileOpen = async (selectedFile) => {
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
  
        try {
          // Load the file
          await workbook.xlsx.load(buffer);
  
          // Assume the first sheet is the one we want
          const sheet = workbook.getWorksheet(1);
          const rows = [];
  
          // Iterate through rows and extract values
          sheet.eachRow((row, rowIndex) => {
            if (rowIndex > 1) { // Skip header row
              const rowData = {
                PN: row.getCell(1).value,
                companyType: row.getCell(2).value,
                companyName: row.getCell(3).value,
                officeName: row.getCell(4).value,
                projectName: row.getCell(5).value,
                cost: parseFloat(row.getCell(6).value),
                dateOrdered: new Date(row.getCell(7).value),
                dateDelivered: new Date(row.getCell(8).value),
              };
              rows.push(rowData);
            }
          });
  
          resolve(rows); // Resolve the promise with the extracted data
        } catch (error) {
          reject(error); // Reject the promise if any error occurs
        }
      };
  
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(selectedFile);
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
