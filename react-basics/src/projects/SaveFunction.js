const ExcelJS = require('exceljs');

const writeFunction = (data) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet 1');

    const headers = ["PN", "Company Type", "Company Name", "Office Name", "Project Name", "Cost", "Date Ordered", "Date Delivered"];

    sheet.addRow(headers);
    data.map((item) => {
        sheet.addRow([
            item.PN,
            item.companyType,
            item.companyName,
            item.officeName,
            item.projectName,
            item.cost,
            item.dateOrdered.toLocaleDateString(),
            item.dateDelivered.toLocaleDateString(),
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