import './App.css';
import { h, Fragment } from 'preact';
import { useRef, useState, useEffect } from 'preact/compat';
import { Input, Button } from 'antd';
import { FileExcelTwoTone, RocketOutlined, CompassTwoTone, UploadOutlined } from '@ant-design/icons';
import { createSpy } from './spy';

window.mockOnSubmit = createSpy(function () {
    console.log('[LOG] submitted');
});

export function App () {
    const refApp = useRef();
    const refInputDataSource = useRef();
    const refInputDataMap = useRef();
    const [pageURL, setPageURL] = useState("");
    const [dataSourceCsv, setDataSourceCsv] = useState("");
    const [dataMapCsv, setDataMapCsv] = useState("");
    const [stepIndex, setStepIndex] = useState(0);

    const LAST_STEP = 2;
    const canGoBack = stepIndex > 0;
    const canGoNext = stepIndex < (LAST_STEP);
    const isLastStep = stepIndex === LAST_STEP;

    const canSubmit = pageURL && dataSourceCsv && dataMapCsv;
    
    const handleBackStep = () => {
        setStepIndex((index) => index - 1);
    };

    const handleNextStep = () => {
        setStepIndex((index) => index + 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLastStep) {
            return;
        }

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
        <div class="app" ref={refApp}>
            <div class="app__compass" />
            <main class="app__page">
                <h1 class="app__title">📦 CSV To Google Map 🌍</h1>
                
                <form id="form-setup" onSubmit={handleSubmit} class="app__form" >
                    <div class="app__step-layout">
                        <div class={`app__step ${isLastStep && 'app__step--last'}`}>
                            {stepIndex + 1}
                        </div>
                    </div>

                    {stepIndex === 0 && (
                        <section class="app__section">
                            <h2>Where do you wish I do the work?</h2>
                            <p class="app__instructions">You need to first create a map in <a href="https://www.google.com/maps/d/u/0/" target="_blank">google map</a>. Then you can copy the link in the input below so that we know where to do the work.</p>
                            <label>
                                <Input 
                                    prefix={<CompassTwoTone />}
                                    name="google-map-page" 
                                    placeholder="Google map link" 
                                    size="large"
                                    onChange={(event) => setPageURL(event.target.value)} 
                                />
                            </label>
                        </section>
                    )}

                    {stepIndex === 1 && (
                        <section class="app__section">
                            <h2>What data you wish to use?</h2>
                            <p class="app__instructions">Create a spreadsheet and export it to CSV format, each row need to at least contain an address. Click the button below to load the CSV.</p>
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
                        </section>
                    )}

                    {stepIndex === LAST_STEP && (
                        <section class="app__section">
                            <h2>Where I should place your data on the map?</h2>
                            <p class="app__instructions"></p>
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
                        </section>
                    )}
                    
                    <div class="app__navigation-layout">
                        {canGoBack && (
                            <Button 
                                size="large" 
                                onClick={handleBackStep} 
                                className="app__back"
                            >
                                Back
                            </Button>)
                        }

                        {canGoNext && (
                            <Button 
                                size="large" 
                                onClick={handleNextStep} 
                                className="app__next"
                            >
                            Next
                            </Button>)
                        }

                        {isLastStep && (
                            <Button 
                                htmlType="submit"
                                type="primary" 
                                size="large" 
                                icon={<RocketOutlined />}
                                className="app__next"
                            >
                                Submit
                            </Button>)
                        }
                    </div>
                </form>
            </main>
        </div>
    )
}