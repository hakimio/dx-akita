module.exports = {
    name: 'api',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/api',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    }
};
