import React      from 'react';
import { saveAs } from 'file-saver';
import * as XLSX  from 'xlsx';
import Papa       from 'papaparse';
import jsPDF      from 'jspdf';
import 'jspdf-autotable';

import styles from './TableExport.module.scss';

const TableExport: React.FC = () => {
    const exportToExcel = (tableId: string, fileName: string) => {
        const table = document.getElementById(tableId);
        if (table) {
            const workbook = XLSX.utils.table_to_book(table);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(data, `${fileName}.xlsx`);
        }
    };

    const exportToCSV = (tableId: string, fileName: string) => {
        const table = document.getElementById(tableId);
        if (table) {
            const rows = Array.from(table.querySelectorAll('tr'));
            const csvData = rows.map(row => {
                const cells = Array.from(row.querySelectorAll('th, td'));
                return cells.map(cell => cell.textContent || '');
            });
            const csvString = Papa.unparse(csvData);
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, `${fileName}.csv`);
        }
    };

    const exportToPDF = (tableId: string, fileName: string) => {
        const table = document.getElementById(tableId);
        if (table) {
            const doc = new jsPDF();
            (doc as any).autoTable({ html: `#${tableId}` });
            doc.save(`${fileName}.pdf`);
        }
    };

    return (
        <div className={ styles.tableContainer }>
            <table id="exampleTable">
                <thead>
                    <tr>
                        <th>Columna 1</th>
                        <th>Columna 2</th>
                        <th>Columna 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Fila 1 Dato 1</td>
                        <td>Fila 1 Dato 2</td>
                        <td>Fila 1 Dato 3</td>
                    </tr>
                    <tr>
                        <td>Fila 2 Dato 1</td>
                        <td>Fila 2 Dato 2</td>
                        <td>Fila 2 Dato 3</td>
                    </tr>
                    <tr>
                        <td>Fila 2 Dato 1</td>
                        <td>Fila 2 Dato 2</td>
                        <td>Fila 2 Dato 3</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => exportToExcel('exampleTable', 'example')}>Exportar en Excel</button>
            <button onClick={() => exportToCSV('exampleTable', 'example')}>Exportar en CSV</button>
            <button onClick={() => exportToPDF('exampleTable', 'example')}>Exportar en PDF</button>
        </div>
    );
};

export default TableExport;
