module.exports = {
    ...jest.requireActual('..'),
    __esModule: true,
    getSecretWorld: jest.fn().mockRejectedValue(Promise.resolve('clown'))
}