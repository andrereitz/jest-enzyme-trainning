module.exports = {
    ...jest.requireActual('..'),
    __esModule: true,
    getSecretWorld: jest.fn().mockReturnValue(Promise.resolve('clown'))
}