
import * as XLSX from 'xlsx';

const ExcelSheetDemo = () => {
  const handleDownload = () => {
    // Create sample data (replace this with your actual data)
    const data = [['Name', 'Age'], ['John Doe', 30], ['Jane Smith', 25]];

    // Create a workbook with a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert the workbook to a Blob
    const wbBlob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a URL for the Blob and trigger a download
    const url = URL.createObjectURL(wbBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample.xlsx';
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Spreadsheet</button>
    </div>
  );
};

export default ExcelSheetDemo;
