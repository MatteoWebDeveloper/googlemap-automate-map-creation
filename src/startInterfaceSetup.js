const browser = require('./pupeteerInstance');
const { saveSetup } = require('./setupInstance');

const startInterfaceSetup = async () => {
    await browser.page.setContent(`
        <style>
            label {
                display: block;
                margin-bottom: 15px;
            }
        </style>

        <h1>Hello world</h1>
        <form id="form-setup">
            <label>
                Google map link
                <input type="text" name="google-map-page" />
            </label>

            <label>
                Data source CSV
                <input type="file" name="data-source-csv" accept=".csv" />
            </label>

            <label>
                Data mapping CSV
                <input type="file" name="data-map-csv" accept=".csv" />
            </label>

            <button type="submit" id="submit">Submit</button>
        </form>

        <script>
            const createSpy = (implementation) => {
                function mockWrapper (...params) {
                    mockWrapper.calls++;
                    implementation(...params);
                }

                mockWrapper.calls = 0;

                return mockWrapper;
            };

            const mockOnSubmit = createSpy(function () {
                console.log('submit');
            });

            document
                .querySelector('#submit')
                .addEventListener('click', mockOnSubmit);

            document
                .querySelector('#form-setup')
                .addEventListener('submit', (event) => {
                    event.preventDefault();
                });
        </script>
    `);
    
    await browser.page.waitFor(eval(`() => {
        return mockOnSubmit.calls > 0;
    }`), { timeout: 0 });

    const formData = await browser.page.evaluate(eval(`async () => {
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

        return transferData;
    }`));

    console.log('[LOG] Setup Data', formData);

    saveSetup(formData);
}

module.exports = {
    startInterfaceSetup
}