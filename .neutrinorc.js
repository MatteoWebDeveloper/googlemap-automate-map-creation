const preact = require('@neutrinojs/preact');

module.exports = {
    options: {
        source: 'ui',
        output: 'dist',
    },
    use: [preact({
        hot: false,
    })],
};