import * as XLSX from "xlsx";

function TestDemo() {
    const exportToExcel = () => {
        const data = [
          { Name: "John Doe", Hours: 40, Rate: 25, Total: 1000 },
          { Name: "Jane Smith", Hours: 35, Rate: 30, Total: 1050 }
          // Add more data as needed
        ];
      
        const ws = XLSX.utils.json_to_sheet(data);
      
        // Add styling to the header row
        ws["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }]; // Set column widths
        ws["A1"].s = { font: { bold: true }, alignment: { horizontal: "center" }, fill: { fgColor: { rgb: "FFA07A" } } }; // Style for header cells
      
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Timesheet");
        XLSX.writeFile(wb, "timesheet.xlsx");
      };
      
 
  return (
    <div>
        <h1>ExceleSheet Download</h1>
        <button onClick={exportToExcel}>Dowload</button>
    </div>
  )
}

export default TestDemo