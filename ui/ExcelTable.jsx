import './ExcelTable.css';
import { h } from 'preact';

export function ExcelTable ({ data, isPreview }) {
    return (
        <table class={`excel-table ${isPreview && 'excel-table--preview'}`}>
            <thead>
                <tr>{data.columns.map(columnName => <th>{columnName}</th>)}</tr>
            </thead>
            <tbody>
                {data.rows.map((row) => (
                    <tr>
                        {row.map((cellContent) => <td>{cellContent}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}