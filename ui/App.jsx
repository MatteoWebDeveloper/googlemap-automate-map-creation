import './App.css';
import { h } from 'preact';
import { useRef, useState } from 'preact/compat';
import { Steps, Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { StepUrl } from './StepUrl';
import { StepData } from './StepData';
import { StepMap } from './StepMap';
import { csvToTable } from './csvToTable';
const { Step } = Steps;

window.puppeteerData = null;

const steps = [
    { title: 'URL' },
    { title: 'Data' },
    { title: 'Instructions' },
];

export function App () {
    const refApp = useRef();
    const [pageURL, setPageURL] = useState("");
    const [dataSourceCsv, setDataSourceCsv] = useState(null);
    const [dataSourceColumns, setDataSourceColumns] = useState([]);
    const [dataMapCsv, setDataMapCsv] = useState(null);
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

    const handleDataCsv = async (event) => {
        const file = event.target.files[0];
        
        setDataSourceCsv(file);
        
        const csvText = await file.text();
        const { columns } = csvToTable(csvText);

        setDataSourceColumns(columns.map(column => column.title));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!canSubmit) {
            alert('One or more steps are not completed');
            return;
        }

        const PAGE = pageURL;
        const DATA_SOURCE_CSV = await dataSourceCsv.text();
        const DATA_MAP_CSV = await dataMapCsv.text();
        
        const transferData = {
            PAGE,
            DATA_SOURCE_CSV,
            DATA_MAP_CSV,
        };

        window.puppeteerData = transferData;
        
        console.log(window.puppeteerData);
    }

    return (
        <div class="app" ref={refApp}>
            <div class="app__compass" />
            <main class="app__page">
                <h1 class="app__title">📦 CSV To Google Map 🌍</h1>

                <div class="app__steps-layout">
                    <Steps current={stepIndex}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                
                <form id="form-setup" onSubmit={handleSubmit} class="app__form" >
                    {stepIndex === 0 && (
                        <StepUrl onChange={(event) => setPageURL(event.target.value)} />
                    )}

                    {stepIndex === 1 && (
                        <StepData 
                            file={dataSourceCsv} 
                            onChange={handleDataCsv}
                        />
                    )}

                    {stepIndex === LAST_STEP && (
                        <StepMap 
                            file={dataMapCsv} 
                            columns={dataSourceColumns}
                            onChange={(event) => setDataMapCsv(event.target.files[0])}
                        />
                    )}
                </form>

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
                            onClick={handleSubmit}
                            className="app__next"
                        >
                            Submit
                        </Button>)
                    }
                </div>
            </main>
        </div>
    )
}