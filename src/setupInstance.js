let setup = {
    DATA_SOURCE_CSV: ``,
    DATA_MAP_CSV: ``
};

const saveSetup = (newSetup) => {
    setup = { ...setup, ...newSetup };
};

const getSetup = () => setup;

module.exports = {
    saveSetup,
    getSetup
};