let setup = {
    PAGE: null,
    DATA_SOURCE_CSV: ``,
    DATA_MAP_CSV: ``
};

const saveUserSetup = (newSetup) => {
    setup = { ...setup, ...newSetup };
};

const getUserSetup = () => setup;

module.exports = {
    saveUserSetup,
    getUserSetup
};