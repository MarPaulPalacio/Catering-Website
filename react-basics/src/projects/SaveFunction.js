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

    const filePath = 'output.xlsx';

    // Use writeFile to save the file
    workbook.xlsx.writeFile(filePath)
        .then(() => {
            console.log(`Excel file created successfully at: ${filePath}`);
        })
        .catch((error) => {
            console.error('Error creating Excel file:', error);
        });
};

export default writeFunction;