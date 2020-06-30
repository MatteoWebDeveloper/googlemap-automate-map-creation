const preact = require('@neutrinojs/preact');

module.exports = {
    options: {
        source: 'ui',
        output: 'dist',
        mains: {
            index: {
                template: 'ui/index.html'
            }
        }
    },
    use: [preact({
        hot: false,
    })],
};