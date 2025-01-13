const ExcelJS = require('exceljs');

const writeFunction = (data) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet 1');

    const headers = ["Project Name", "Agency", "Department", "Mode of Procurement", "Date Requested", "Date Requested Num", "Request Cost", "Date Delivered", "Date Delivered Num", "Delivered Cost"];

    sheet.addRow(headers);
    data.map((item) => {
        sheet.addRow([
            item.projectName,
            item.companyName,
            item.officeName,
            item.modeOfProcurement,
            item.dateOrdered.toLocaleDateString(),
            item.dateOrderedNum,
            item.cost,
            item.dateDelivered.toLocaleDateString(),
            item.dateDeliveredNum,
            item.pdCost,
        ]);
    });

    workbook.xlsx.writeBuffer()
    .then((buffer) => {
      // Create a blob from the buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'output.xlsx';
      link.click();

      console.log('Excel file created and downloaded successfully.');
    })
    .catch((error) => {
      console.error('Error creating Excel file:', error);
    });
};



export default writeFunction;