import { h } from 'preact';
import { useRef } from 'preact/compat';
import { Button } from 'antd';
import { FileExcelTwoTone, UploadOutlined } from '@ant-design/icons';

export function StepData ({onChange, file}) {
    const refInputDataSource = useRef();

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
                        <FileExcelTwoTone /> {file}
                    </div>
                )}

                {/* TODO preview here CSV */}
            </div>
        </section>
    )
}