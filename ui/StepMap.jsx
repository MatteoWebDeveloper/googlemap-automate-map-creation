import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/compat';
import FileSaver from 'file-saver';
import { Input, Button, Tag, Popover, message } from 'antd';
import { InfoCircleTwoTone, FileExcelTwoTone, UploadOutlined } from '@ant-design/icons';
import addressImage from './assets/address.png';
import layerImage from './assets/layer.png';
import locationImage from './assets/location.png';

const PAGE_UPLOAD = 'upload';
const PAGE_CREATE = 'create';

export function StepMap ({onChange, file, columns = []}) {
    const refInputDataMap = useRef();
    const [mapData, setMapData] = useState({
        address: "",
        layerName: "",
        locationName: "",
        locationDescription: "",
    });

    const [page, setPage] = useState(PAGE_UPLOAD);

    const canDownload = Object.values(mapData).every(value => value !== "");

    const createCsvFile = () => {
        const csvData = [
            Object.keys(mapData),
            Object.values(mapData)
        ];

        const csvString = csvData.map(e => e.join(",")).join("\n");

        return new File([csvString], 'instructions.csv', {
            type: "text/csv;charset=utf-8",
        });
    };

    const handleNewInstructions = (event) => {
        setMapData((data) => ({...data, [event.target.name]: event.target.value }));
    };

    const handleTagClick = async (event) => {
        const text = event.target.textContent;
        await navigator.clipboard.writeText(text);

        message.success(`Copied: ${text}`);
    };

    const handleDownload = () => {
        const file = createCsvFile();

        FileSaver.saveAs(file, "google_map_instructions.csv");
    }

    useEffect(() => {
        if (canDownload) {
            const file = createCsvFile();
    
            onChange(file);
        }
    }, [canDownload, mapData])

    return (
        <Fragment>
            {page === PAGE_UPLOAD && (
                <section class="app__section">
                    <div class="app__instructions-layout">
                        <h2>How I should place your data on the map?</h2>
                        
                        <p class="app__instructions">
                            Upload existing instructions spreadsheet or <a onClick={() => setPage(PAGE_CREATE)}>create new one.</a>
                        </p>
                    </div>

                    <div class="app__file-upload">
                        <label onClick={() => refInputDataMap.current.click()}>
                            <input ref={refInputDataMap} type="file" name="data-map-csv" accept=".csv" onChange={(event) => onChange(event.target.files[0])}/>
                            
                            <Button size="large" >
                                <UploadOutlined /> Upload Instructions CSV
                            </Button>
                        </label>

                        {file && (
                            <div class="app__file-preview">
                                <FileExcelTwoTone /> {file.name}
                            </div>
                        )}
                    </div>
                </section>)
            }

            {page === PAGE_CREATE && (
                <section class="app__section">
                    <div class="app__instructions-layout">
                        <h2>Create instructions CSV</h2>

                        <p class="app__instructions">Add Column names and text into the input like the following example: <code>{'{'}Column name{'}'} static text</code></p>
                    </div>

                    <p>
                        List columns: 
                        {columns.map((columnName) => <Tag onClick={handleTagClick}>{`{${columnName}}`}</Tag>)}
                    </p>

                    <div class="app__step-map-inputs">
                        <label>
                            <Input 
                                name="address" 
                                placeholder="address" 
                                size="large"
                                onChange={handleNewInstructions}
                            />

                            <Popover title="Search address" content={<img width="400" height="44" src={addressImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>

                        <label>
                            <Input 
                                name="layerName" 
                                placeholder="layer name" 
                                size="large"
                                onChange={handleNewInstructions}
                            />

                            <Popover title="We add your location mark under layer name" content={<img width="400" height="165" src={layerImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>

                        <label>
                            <Input 
                                name="locationName" 
                                placeholder="location name" 
                                size="large"
                                onChange={handleNewInstructions} 
                            />

                            <Popover title="We add location name" content={<img width="405" height="193" src={locationImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>

                        <label>
                            <Input 
                                name="locationDescription" 
                                placeholder="location description" 
                                size="large"
                                onChange={handleNewInstructions} 
                            />

                            <Popover title="We add location description" content={<img width="405" height="193" src={locationImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>
                    </div>

                    <Button 
                        size="large" 
                        disabled={!canDownload} 
                        onClick={handleDownload}
                    >
                        Save instructions CSV
                    </Button>
                </section>)
            }
        </Fragment>
    )
}
