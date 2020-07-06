import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/compat';
import { Button } from 'antd';
import { FileExcelTwoTone, UploadOutlined } from '@ant-design/icons';
import { csvToTable } from './csvToTable';
import { ExcelTable } from './ExcelTable';

export function StepData ({onChange, file}) {
    const refInputDataSource = useRef();
    const [csvTable, setCsvTable] = useState({
        columns: [],
        rows: [],
    });

    useEffect(async () => {
        if (!file) {
            return;
        }

        const csvText = await file.text();
        const { columns, rows } = csvToTable(csvText);
        const limitRows = rows.filter((value, index) => index < 10);

        setCsvTable({
            columns,
            rows: limitRows
        });
    }, [file])

    return (
        <section class="app__section">
            <h2>What data you wish to use?</h2>
            <p class="app__instructions">Create a spreadsheet and export it to CSV format, each row need to at least contain an address. Click the button below to load the CSV.</p>
            <div class="app__file-upload">
                <label onClick={() => refInputDataSource.current.click()}>
                    <input ref={refInputDataSource} type="file" name="data-source-csv" accept=".csv" onChange={onChange} />
                    
                    <Button size="large" >
                        <UploadOutlined /> Upload Data source CSV
                    </Button>
                </label>

                {file && (
                    <div class="app__file-preview">
                        <FileExcelTwoTone /> {file.name}
                    </div>
                )}

                {file && (
                    <div class="app__step-data-preview">
                        <ExcelTable data={csvTable} isPreview />
                    </div>
                )}
            </div>
        </section>
    )
}