module.exports = {
    name: 'dx-akita',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/dx-akita',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
};
