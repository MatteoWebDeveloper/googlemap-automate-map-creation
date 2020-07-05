import './App.css';
import { h } from 'preact';
import { useRef, useState } from 'preact/compat';
import { Steps, Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { StepUrl } from './StepUrl';
import { StepData } from './StepData';
import { StepMap } from './StepMap';
import { createSpy } from './spy';
const { Step } = Steps;

window.mockOnSubmit = createSpy(function () {
    console.log('[LOG] submitted');
});

const steps = [
    {
      title: 'URL',
    },
    {
      title: 'Data',
    },
    {
      title: 'Instructions',
    },
];

export function App () {
    const refApp = useRef();
    const [pageURL, setPageURL] = useState("");
    const [dataSourceCsv, setDataSourceCsv] = useState("");
    const [dataMapCsv, setDataMapCsv] = useState("");
    const [stepIndex, setStepIndex] = useState(2);

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
                            onChange={(event) => setDataSourceCsv(event.target.value)}
                        />
                    )}

                    {stepIndex === LAST_STEP && (
                        <StepMap 
                            file={dataMapCsv} 
                            onChange={(event) => setDataMapCsv(event.target.value)}
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