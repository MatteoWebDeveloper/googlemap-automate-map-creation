import './App.css';
import { h } from 'preact';
import { useRef, useState } from 'preact/compat';
import { Input, Button } from 'antd';
import { FileExcelTwoTone, RocketOutlined, CompassTwoTone, UploadOutlined } from '@ant-design/icons';
import { createSpy } from './spy';

window.mockOnSubmit = createSpy(function () {
    console.log('[LOG] submitted');
});

export function App () {
    const refInputDataSource = useRef();
    const refInputDataMap = useRef();
    const [pageURL, setPageURL] = useState("");
    const [dataSourceCsv, setDataSourceCsv] = useState("");
    const [dataMapCsv, setDataMapCsv] = useState("");

    const canSubmit = pageURL && dataSourceCsv && dataMapCsv;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!canSubmit) {
            alert('Some fields are empty');
            return;
        }

        window.mockOnSubmit();

        const formData = new FormData(document.querySelector('#form-setup'));

        const PAGE = formData.get('google-map-page');
        const DATA_SOURCE_CSV = await formData.get('data-source-csv').text();
        const DATA_MAP_CSV = await formData.get('data-map-csv').text();
        
        const transferData = {
            PAGE,
            DATA_SOURCE_CSV,
            DATA_MAP_CSV,
        };
        
        console.log(transferData);
    }

    return (
        <div class="app">
            <main class="app__page">
                <h1 class="app__title">📦 CSV To Google Map 🌍</h1>
                
                <form id="form-setup" onSubmit={handleSubmit} class="app__form" >
                    <label>
                        <Input 
                            prefix={<CompassTwoTone />}
                            name="google-map-page" 
                            placeholder="Google map link" 
                            size="large"
                            onChange={(event) => setPageURL(event.target.value)} 
                        />
                    </label>

                    <div class="app__file-upload">
                        <label onClick={() => refInputDataSource.current.click()}>
                            <input ref={refInputDataSource} type="file" name="data-source-csv" accept=".csv" onChange={(event) => setDataSourceCsv(event.target.value)} />
                            
                            <Button size="large" >
                                <UploadOutlined /> Upload Data source CSV
                            </Button>
                        </label>

                        {dataSourceCsv && (
                            <div class="app__file-preview">
                                <FileExcelTwoTone /> {dataSourceCsv}
                            </div>
                        )}
                    </div>

                    <div class="app__file-upload">
                        <label onClick={() => refInputDataMap.current.click()}>
                            <input ref={refInputDataMap} type="file" name="data-map-csv" accept=".csv" onChange={(event) => setDataMapCsv(event.target.value)}/>
                            
                            <Button size="large" >
                                <UploadOutlined /> Upload Data mapping CSV
                            </Button>
                        </label>

                        {dataMapCsv && (
                            <div class="app__file-preview">
                                <FileExcelTwoTone /> {dataMapCsv}
                            </div>
                        )}
                    </div>

                    <Button 
                        htmlType="submit"
                        type="primary" 
                        size="large" 
                        icon={<RocketOutlined />}
                    >
                        Submit
                    </Button>
                </form>
            </main>
        </div>
    )
}